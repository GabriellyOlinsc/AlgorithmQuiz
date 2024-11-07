import { IsArray, IsInt, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsString } from 'class-validator';

export class CreatePhaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;  

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsNotEmpty({ each: true })
  questionIds: number[];  
}
