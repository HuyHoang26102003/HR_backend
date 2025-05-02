import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobRepository extends Repository<Job> {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {
    super(
      jobRepository.target,
      jobRepository.manager,
      jobRepository.queryRunner,
    );
  }
} 