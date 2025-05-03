import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffRequestShift } from './entities/staff_request_shift.entity';

@Injectable()
export class StaffRequestShiftsRepository extends Repository<StaffRequestShift> {
  constructor(
    @InjectRepository(StaffRequestShift)
    private staffRequestShiftsRepository: Repository<StaffRequestShift>,
  ) {
    super(
      staffRequestShiftsRepository.target,
      staffRequestShiftsRepository.manager,
      staffRequestShiftsRepository.queryRunner,
    );
  }
} 