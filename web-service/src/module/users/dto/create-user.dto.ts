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
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, { message: 'Password must be alphanumeric.' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: `Role must be 'TEACHER' or 'STUDENT'.` })
  role: Role;

  @ValidateIf((o) => o.role === Role.Student)
  @Length(6)
  @IsNotEmpty({ message: 'enrollCode must be provided for students.' })
  enrollCode: string;
}
