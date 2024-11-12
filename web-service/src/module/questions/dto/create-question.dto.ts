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
import { ApiProperty } from '@nestjs/swagger';


export class Alternative {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  statement: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  correct: boolean;
}

export class CreateQuestionDto {
  @ApiProperty({ type: String, description: 'Question statement' })
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsNotEmpty()
  @IsEnum(Level)
  @ApiProperty({
    enum: Level,
    description: 'Nível de dificuldade da pergunta',
    example: Level.BEGINNER,
  })
  level: Level;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @Validate(UniqueCorrectAlternative, {
    message: 'Only one alternative should be marked as correct',
  })
  @ApiProperty({ 
    type: [Alternative], 
    description: 'Lista de alternativas para a pergunta, onde uma deve ser marcada como correta', 
    minItems: 5, 
    maxItems: 5 
  })
  alternatives: Alternative[];
}
