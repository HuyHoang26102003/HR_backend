import { IsString, IsDateString, IsEnum, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  staff_id: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  check_in?: string;

  @IsString()
  @IsOptional()
  check_out?: string;

  @IsEnum(['Present', 'Absent'])
  @IsNotEmpty()
  status: 'Present' | 'Absent';

  @IsNumber()
  @IsOptional()
  hours_worked?: number;
}

