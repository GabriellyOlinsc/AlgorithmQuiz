import { ApiProperty } from '@nestjs/swagger';
import { Level } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreatePhaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Level)
  @ApiProperty({
    enum: Level,
    description: 'Nível de dificuldade da pergunta',
    example: Level.BEGINNER,
  })
  level: Level;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsNotEmpty({ each: true })
  @ApiProperty({ type: [Number], minItems: 4, maxItems: 4 })
  questionIds: number[];

}
