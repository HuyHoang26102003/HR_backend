import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveTypesService } from './leave_types.service';
import { LeaveTypesController } from './leave_types.controller';
import { LeaveType } from './entities/leave_type.entity';
import { LeaveTypesRepository } from './leave_types.repository';
import { Job } from 'src/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveType, Job])],
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService, LeaveTypesRepository],
  exports: [LeaveTypesService],
})
export class LeaveTypesModule {}
