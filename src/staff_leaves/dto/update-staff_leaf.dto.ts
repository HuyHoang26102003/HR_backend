import { IsString, IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateStaffLeaveDto {
  @IsString()
  @IsOptional()
  staff_id?: string;

  @IsString()
  @IsOptional()
  leave_type_id?: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  @IsOptional()
  status?: 'Pending' | 'Approved' | 'Rejected';
}