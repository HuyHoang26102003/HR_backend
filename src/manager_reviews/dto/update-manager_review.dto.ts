import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateManagerReviewDto {
  @IsString()
  @IsOptional()
  staff_id?: string;

  @IsString()
  @IsOptional()
  performance_review?: string;

  @IsString()
  @IsOptional()
  morale_review?: string;
}