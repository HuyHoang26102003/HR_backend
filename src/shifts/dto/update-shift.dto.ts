import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateShiftDto {
  @IsString()
  @IsOptional()
  staff_id?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  shift_type_id?: string;

  @IsString()
  @IsOptional()
  job_id?: string;
}