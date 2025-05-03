import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contact_phone: string;

  @IsString()
  @IsNotEmpty()
  contact_email: string;

  @IsString()
  @IsNotEmpty()
  role_id: string;
  
  @IsString()
  @IsNotEmpty()
  job_level_id: string;

  @IsString()
  @IsNotEmpty()
  resume: string;

  @IsEnum(['Pending', 'Approved', 'Rejected', 'Interviewing'])
  @IsOptional()
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Interviewing';
}

