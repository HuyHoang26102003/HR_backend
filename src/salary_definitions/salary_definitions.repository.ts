import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaryDefinition } from './entities/salary_definition.entity';

@Injectable()
export class SalaryDefinitionsRepository extends Repository<SalaryDefinition> {
  constructor(
    @InjectRepository(SalaryDefinition)
    private salaryDefinitionsRepository: Repository<SalaryDefinition>,
  ) {
    super(
      salaryDefinitionsRepository.target,
      salaryDefinitionsRepository.manager,
      salaryDefinitionsRepository.queryRunner,
    );
  }
} 