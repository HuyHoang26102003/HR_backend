import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalaryDefinitionDto {
  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsNumber()
  @IsNotEmpty()
  hourly_wage: number;
}

