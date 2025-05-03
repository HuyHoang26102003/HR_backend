import { IsString, IsNotEmpty, IsInt, IsArray, IsEnum, Min, Max, ArrayMaxSize, ArrayMinSize, IsUUID } from 'class-validator';

export class CreateStaffRequestShiftDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  staff_id: string;

  @IsInt()
  @Min(1)
  @Max(53)
  week_index: number;

  @IsInt()
  @Min(2024)
  year: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  available_shift_ids: string[];

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status?: 'Pending' | 'Approved' | 'Rejected';
} 