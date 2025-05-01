import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdatePayrollDto {
  @IsString()
  @IsOptional()
  staff_id?: string;

  @IsString()
  @IsOptional()
  pay_period?: string;

  @IsString()
  @IsOptional()
  salary_definition_id?: string;

  @IsNumber()
  @IsOptional()
  total_hours_worked?: number;

  @IsNumber()
  @IsOptional()
  total_pay?: number;

  @IsEnum(['Pending', 'Processed'])
  @IsOptional()
  status?: 'Pending' | 'Processed';
}