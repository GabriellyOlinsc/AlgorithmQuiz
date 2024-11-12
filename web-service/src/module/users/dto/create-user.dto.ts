import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNotEmpty,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { Role } from 'src/core/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {
    message: 'Password must be alphanumeric.',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: `Role must be 'TEACHER' or 'STUDENT'.` })
  @ApiProperty({
    enum: Role,
    example: Role.Student,
  })
  role: Role;

  @ValidateIf((o) => o.role === Role.Student)
  @Length(6)
  @IsNotEmpty({ message: 'enrollCode must be provided for students.' })
  @ApiProperty({
    type: String,
    example: '123456',
    required: false,
  })
  enrollCode: string;
}
