import { Injectable } from '@nestjs/common';
import { CreateShiftTypeDto } from './dto/create-shift_type.dto';
import { UpdateShiftTypeDto } from './dto/update-shift_type.dto';

@Injectable()
export class ShiftTypesService {
  create(createShiftTypeDto: CreateShiftTypeDto) {
    return 'This action adds a new shiftType';
  }

  findAll() {
    return `This action returns all shiftTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shiftType`;
  }

  update(id: number, updateShiftTypeDto: UpdateShiftTypeDto) {
    return `This action updates a #${id} shiftType`;
  }

  remove(id: number) {
    return `This action removes a #${id} shiftType`;
  }
}
