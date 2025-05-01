import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  level_id: string;
}
