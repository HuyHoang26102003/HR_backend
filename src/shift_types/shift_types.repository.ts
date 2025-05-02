import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShiftType } from './entities/shift_type.entity';

@Injectable()
export class ShiftTypesRepository extends Repository<ShiftType> {
  constructor(
    @InjectRepository(ShiftType)
    private shiftTypesRepository: Repository<ShiftType>,
  ) {
    super(
      shiftTypesRepository.target,
      shiftTypesRepository.manager,
      shiftTypesRepository.queryRunner,
    );
  }
} 