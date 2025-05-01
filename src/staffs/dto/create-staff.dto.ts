import { IsString, IsBoolean, IsEnum, IsDateString, IsNumber, IsObject, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsString()
  @IsOptional()
  job_level_id?: string;

  @IsObject()
  @IsNotEmpty()
  on_board: { is_on_board: boolean; start_date: string; end_date?: string };

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsEnum(['Active', 'Terminated'])
  @IsOptional()
  status?: 'Active' | 'Terminated';

  @IsObject()
  @IsOptional()
  avatar?: { key: string; url: string };

  @IsBoolean()
  @IsOptional()
  is_part_time?: boolean;

  @IsEnum(['Male', 'Female', 'Other'])
  @IsOptional()
  gender?: 'Male' | 'Female' | 'Other';

  @IsDateString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  national_id_card: string;

  @IsNumber()
  @IsOptional()
  leave_days_taken?: number;
}

