import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftsRepository extends Repository<Shift> {
  constructor(
    @InjectRepository(Shift)
    private shiftsRepository: Repository<Shift>,
  ) {
    super(
      shiftsRepository.target,
      shiftsRepository.manager,
      shiftsRepository.queryRunner,
    );
  }
} 