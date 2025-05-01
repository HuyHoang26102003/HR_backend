import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { AttendanceService } from './attendances.service';
import { AttendanceController } from './attendances.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Staff])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}