import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePayrollDto {
  @IsString()
  @IsNotEmpty()
  staff_id: string;

  @IsString()
  @IsNotEmpty()
  pay_period: string;

  @IsString()
  @IsNotEmpty()
  salary_definition_id: string;

  @IsNumber()
  @IsNotEmpty()
  total_hours_worked: number;

  @IsNumber()
  @IsNotEmpty()
  total_pay: number;

  @IsEnum(['Pending', 'Processed'])
  @IsOptional()
  status?: 'Pending' | 'Processed';
}

