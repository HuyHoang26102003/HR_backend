import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';

@Injectable()
export class PayrollsRepository extends Repository<Payroll> {
  constructor(
    @InjectRepository(Payroll)
    private payrollsRepository: Repository<Payroll>,
  ) {
    super(
      payrollsRepository.target,
      payrollsRepository.manager,
      payrollsRepository.queryRunner,
    );
  }
} 