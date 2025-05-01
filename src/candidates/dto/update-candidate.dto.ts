import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCandidateDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    contact_phone?: string;
  
    @IsString()
    @IsOptional()
    contact_email?: string;
  
    @IsString()
    @IsOptional()
    role_id?: string;
  
    @IsString()
    @IsOptional()
    resume?: string;
  
    @IsEnum(['Pending', 'Approved', 'Rejected', 'Interviewing'])
    @IsOptional()
    status?: 'Pending' | 'Approved' | 'Rejected' | 'Interviewing';
  }