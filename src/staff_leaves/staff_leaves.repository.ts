import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffLeave } from './entities/staff_leaves.entity';

@Injectable()
export class StaffLeavesRepository extends Repository<StaffLeave> {
  constructor(
    @InjectRepository(StaffLeave)
    private staffLeavesRepository: Repository<StaffLeave>,
  ) {
    super(
      staffLeavesRepository.target,
      staffLeavesRepository.manager,
      staffLeavesRepository.queryRunner,
    );
  }
} 