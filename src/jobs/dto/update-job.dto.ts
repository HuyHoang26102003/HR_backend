import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateJobDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  department_id?: string;

  @IsString()
  @IsOptional()
  level_id?: string;
}