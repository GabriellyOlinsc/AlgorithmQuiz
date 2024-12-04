import { ApiProperty } from '@nestjs/swagger';
import { Level } from '@prisma/client';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateManualQuizDto {
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

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsNotEmpty({ each: true })
  @ApiProperty({ type: [Number], minItems: 5, maxItems: 5 })
  phasesIds: number[];
}

export class CreateAutomaticQuizDto {
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
}