import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  @IsNotEmpty()
  staff_id: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  shift_type_id: string;

  @IsString()
  @IsNotEmpty()
  job_id: string;
}
