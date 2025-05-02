import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentRepository extends Repository<Department> {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {
    super(
      departmentRepository.target,
      departmentRepository.manager,
      departmentRepository.queryRunner,
    );
  }
} 