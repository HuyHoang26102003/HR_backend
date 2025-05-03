import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { CandidateService } from './candidates.service';
import { CandidateController } from './candidates.controller';
import { CandidateRepository } from './candidate.repository';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Job, JobLevel])],
  controllers: [CandidateController],
  providers: [CandidateService, CandidateRepository],
})
export class CandidateModule {}