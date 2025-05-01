import { IsString, IsBoolean, IsEnum, IsDateString, IsNumber, IsObject, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateStaffDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  employee_id?: string;

  @IsString()
  @IsOptional()
  job_id?: string;

  @IsString()
  @IsOptional()
  job_level_id?: string;

  @IsObject()
  @IsOptional()
  on_board?: { is_on_board: boolean; start_date: string; end_date?: string };

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

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
  @IsOptional()
  date_of_birth?: string;

  @IsString()
  @IsOptional()
  national_id_card?: string;

  @IsNumber()
  @IsOptional()
  leave_days_taken?: number;
}