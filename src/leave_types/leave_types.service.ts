import { Injectable } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/create-leave_type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave_type.dto';

@Injectable()
export class LeaveTypesService {
  create(createLeaveTypeDto: CreateLeaveTypeDto) {
    return 'This action adds a new leaveType';
  }

  findAll() {
    return `This action returns all leaveTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaveType`;
  }

  update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto) {
    return `This action updates a #${id} leaveType`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveType`;
  }
}
