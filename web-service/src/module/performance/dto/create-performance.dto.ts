import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePerformanceDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  quizId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  correctAnswer: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  incorrectAnswer: number;

  @ApiProperty()
  @IsNotEmpty()
  timeSpent: number;
}
