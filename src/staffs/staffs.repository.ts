import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffsRepository extends Repository<Staff> {
  constructor(
    @InjectRepository(Staff)
    private staffsRepository: Repository<Staff>,
  ) {
    super(
      staffsRepository.target,
      staffsRepository.manager,
      staffsRepository.queryRunner,
    );
  }
}
