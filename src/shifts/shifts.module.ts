import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { ShiftType } from 'src/shift_types/entities/shift_type.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { ShiftService } from './shifts.service';
import { ShiftController } from './shifts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shift, ShiftType, Staff, Job])],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}