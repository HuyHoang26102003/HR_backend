import { Injectable } from '@nestjs/common';
import { CreateStaffLeaveDto } from './dto/create-staff_leaf.dto';
import { UpdateStaffLeaveDto } from './dto/update-staff_leaf.dto';

@Injectable()
export class StaffLeavesService {
  create(createStaffLeafDto: CreateStaffLeaveDto) {
    return 'This action adds a new staffLeaf';
  }

  findAll() {
    return `This action returns all staffLeaves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staffLeaf`;
  }

  update(id: number, updateStaffLeafDto: UpdateStaffLeaveDto) {
    return `This action updates a #${id} staffLeaf`;
  }

  remove(id: number) {
    return `This action removes a #${id} staffLeaf`;
  }
}
