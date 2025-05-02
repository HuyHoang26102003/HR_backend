import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendancesRepository extends Repository<Attendance> {
  constructor(
    @InjectRepository(Attendance)
    private attendancesRepository: Repository<Attendance>,
  ) {
    super(
      attendancesRepository.target,
      attendancesRepository.manager,
      attendancesRepository.queryRunner,
    );
  }
} 