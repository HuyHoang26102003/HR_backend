import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
