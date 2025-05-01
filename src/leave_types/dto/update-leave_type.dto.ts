import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsNumber()
  @IsNotEmpty()
  max_days_leave: number;

  @IsNumber()
  @IsNotEmpty()
  percentage_earn: number;
}

export class UpdateLeaveTypeDto {
  @IsString()
  @IsOptional()
  job_id?: string;

  @IsNumber()
  @IsOptional()
  max_days_leave?: number;

  @IsNumber()
  @IsOptional()
  percentage_earn?: number;
}