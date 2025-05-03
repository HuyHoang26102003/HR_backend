import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRequestShiftsService } from './staff_request_shifts.service';
import { StaffRequestShiftsController } from './staff_request_shifts.controller';
import { StaffRequestShift } from './entities/staff_request_shift.entity';
import { StaffRequestShiftsRepository } from './staff_request_shifts.repository';
import { Staff } from 'src/staffs/entities/staff.entity';
import { ShiftType } from 'src/shift_types/entities/shift_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffRequestShift, Staff, ShiftType])],
  controllers: [StaffRequestShiftsController],
  providers: [StaffRequestShiftsService, StaffRequestShiftsRepository],
  exports: [StaffRequestShiftsService],
})
export class StaffRequestShiftsModule {} 