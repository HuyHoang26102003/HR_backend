import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { StaffService } from './staffs.service';
import { StaffController } from './staffs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Job, JobLevel])],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}