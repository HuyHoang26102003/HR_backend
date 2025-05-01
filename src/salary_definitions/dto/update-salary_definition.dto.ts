import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateSalaryDefinitionDto {
  @IsString()
  @IsOptional()
  job_id?: string;

  @IsNumber()
  @IsOptional()
  hourly_wage?: number;
}