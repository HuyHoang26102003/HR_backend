import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShiftTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;
}

