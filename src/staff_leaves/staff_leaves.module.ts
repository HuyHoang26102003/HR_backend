import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffLeavesService } from './staff_leaves.service';
import { StaffLeavesController } from './staff_leaves.controller';
import { StaffLeavesRepository } from './staff_leaves.repository';
import { StaffLeave } from './entities/staff_leaves.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { LeaveType } from 'src/leave_types/entities/leave_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffLeave, Staff, LeaveType])],
  controllers: [StaffLeavesController],
  providers: [StaffLeavesService, StaffLeavesRepository],
  exports: [StaffLeavesService],
})
export class StaffLeavesModule {}
