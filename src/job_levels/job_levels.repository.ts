import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobLevel } from './entities/job_level.entity';

@Injectable()
export class JobLevelsRepository extends Repository<JobLevel> {
  constructor(
    @InjectRepository(JobLevel)
    private jobLevelsRepository: Repository<JobLevel>,
  ) {
    super(
      jobLevelsRepository.target,
      jobLevelsRepository.manager,
      jobLevelsRepository.queryRunner,
    );
  }
} 