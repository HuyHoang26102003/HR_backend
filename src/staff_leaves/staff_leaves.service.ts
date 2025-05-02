import { Injectable, NotFoundException } from '@nestjs/common';
import { StaffLeavesRepository } from './staff_leaves.repository';
import { StaffLeave } from './entities/staff_leaves.entity';
import { CreateStaffLeaveDto } from './dto/create-staff_leaf.dto';
import { UpdateStaffLeaveDto } from './dto/update-staff_leaf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';
import { LeaveType } from 'src/leave_types/entities/leave_type.entity';

@Injectable()
export class StaffLeavesService {
  constructor(
    private readonly staffLeavesRepository: StaffLeavesRepository,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(LeaveType)
    private readonly leaveTypeRepository: Repository<LeaveType>,
  ) {}

  async findAll(): Promise<StaffLeave[]> {
    return this.staffLeavesRepository.find();
  }

  async findOne(id: string): Promise<StaffLeave> {
    const staffLeave = await this.staffLeavesRepository.findOne({
      where: { id },
    });
    if (!staffLeave) {
      throw new NotFoundException(`Staff Leave with ID ${id} not found`);
    }
    return staffLeave;
  }

  async create(createStaffLeaveDto: CreateStaffLeaveDto): Promise<StaffLeave> {
    const { staff_id, leave_type_id,...candidateData } = createStaffLeaveDto;
    
    const staff = await this.staffRepository.findOne({ where: { id: staff_id } });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${staff_id} not found`);
    }
    const leave_type = await this.leaveTypeRepository.findOne({ where: { id: leave_type_id } });
    if (!leave_type) {
      throw new NotFoundException(`leave type with ID ${leave_type_id} not found`);
    }
    const staff_leave = await this.staffLeavesRepository.create({
      ...candidateData,
      staff, leave_type
    });
    return this.staffLeavesRepository.save(staff_leave);
  }

  async update(id: string, updateStaffLeaveDto: UpdateStaffLeaveDto): Promise<StaffLeave> {
    const staffLeave = await this.findOne(id);
    Object.assign(staffLeave, updateStaffLeaveDto);
    return this.staffLeavesRepository.save(staffLeave);
  }

  async remove(id: string): Promise<void> {
    const staffLeave = await this.findOne(id);
    await this.staffLeavesRepository.remove(staffLeave);
  }
}
