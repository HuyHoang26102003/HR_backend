import { IsString, IsOptional, IsInt, IsArray, IsEnum, Min, Max, ArrayMaxSize, ArrayMinSize, IsUUID } from 'class-validator';

export class UpdateStaffRequestShiftDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  staff_id?: string;

  @IsInt()
  @Min(1)
  @Max(53)
  @IsOptional()
  week_index?: number;

  @IsInt()
  @Min(2024)
  @IsOptional()
  year?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  @IsOptional()
  available_shift_ids?: string[];

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  @IsOptional()
  status?: 'Pending' | 'Approved' | 'Rejected';
} 