import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendancesRepository } from './attendances.repository';
import { AttendanceController } from './attendances.controller';
import { AttendanceService } from './attendances.service';
import { Staff } from 'src/staffs/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Staff])],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendancesRepository],
  exports: [AttendanceService],
})
export class AttendanceModule {}