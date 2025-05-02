import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Department } from 'src/departments/entities/department.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { JobService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobRepository } from './job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Department, JobLevel])],
  controllers: [JobsController],
  providers: [JobService, JobRepository],
  exports: [JobService],
})
export class JobModule {}