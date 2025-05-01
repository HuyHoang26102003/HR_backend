import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateJobLevelDto {
  @IsString()
  @IsOptional()
  name?: string;
}