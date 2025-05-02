import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveType } from './entities/leave_type.entity';

@Injectable()
export class LeaveTypesRepository extends Repository<LeaveType> {
  constructor(
    @InjectRepository(LeaveType)
    private leaveTypesRepository: Repository<LeaveType>,
  ) {
    super(
      leaveTypesRepository.target,
      leaveTypesRepository.manager,
      leaveTypesRepository.queryRunner,
    );
  }
} 