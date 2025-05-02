import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobLevelsService } from './job_levels.service';
import { JobLevelsController } from './job_levels.controller';
import { JobLevel } from './entities/job_level.entity';
import { JobLevelsRepository } from './job_levels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobLevel])],
  controllers: [JobLevelsController],
  providers: [JobLevelsService, JobLevelsRepository],
  exports: [JobLevelsService],
})
export class JobLevelsModule {}
