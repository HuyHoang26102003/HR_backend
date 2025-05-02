import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateShiftTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'start_time must be in format HH:mm:ss or HH:mm'
  })
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'end_time must be in format HH:mm:ss or HH:mm'
  })
  end_time: string;
}

