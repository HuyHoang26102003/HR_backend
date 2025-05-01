import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateShiftTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  start_time?: string;

  @IsString()
  @IsOptional()
  end_time?: string;
}