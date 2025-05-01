import { IsString, IsDateString, IsEnum, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAttendanceDto {
    @IsString()
    @IsOptional()
    staff_id?: string;
  
    @IsDateString()
    @IsOptional()
    date?: string;
  
    @IsString()
    @IsOptional()
    check_in?: string;
  
    @IsString()
    @IsOptional()
    check_out?: string;
  
    @IsEnum(['Present', 'Absent'])
    @IsOptional()
    status?: 'Present' | 'Absent';
  
    @IsNumber()
    @IsOptional()
    hours_worked?: number;
  }