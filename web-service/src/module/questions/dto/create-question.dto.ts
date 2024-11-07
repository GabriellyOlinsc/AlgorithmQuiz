import { Level } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueCorrectAlternative } from '../validator/unique-correct-alternativa.validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @Validate(UniqueCorrectAlternative, {
    message: 'Only one alternative should be marked as correct',
  })
  alternatives: Alternative[];
}

export class Alternative {
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsBoolean()
  @IsNotEmpty()
  correct: boolean;
}
