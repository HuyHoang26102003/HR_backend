import { IsString, IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStaffLeaveDto {
  @IsString()
  @IsNotEmpty()
  staff_id: string;

  @IsString()
  @IsNotEmpty()
  leave_type_id: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  @IsOptional()
  status?: 'Pending' | 'Approved' | 'Rejected';
}

