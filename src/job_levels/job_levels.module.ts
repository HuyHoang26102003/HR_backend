import { Module } from '@nestjs/common';
import { JobLevelsService } from './job_levels.service';
import { JobLevelsController } from './job_levels.controller';

@Module({
  controllers: [JobLevelsController],
  providers: [JobLevelsService],
})
export class JobLevelsModule {}
