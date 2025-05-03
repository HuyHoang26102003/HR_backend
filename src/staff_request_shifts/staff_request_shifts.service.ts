import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffRequestShift } from './entities/staff_request_shift.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { ShiftType } from 'src/shift_types/entities/shift_type.entity';
import { CreateStaffRequestShiftDto } from './dto/create-staff_request_shift.dto';
import { UpdateStaffRequestShiftDto } from './dto/update-staff_request_shift.dto';
import { StaffRequestShiftsRepository } from './staff_request_shifts.repository';

@Injectable()
export class StaffRequestShiftsService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(ShiftType)
    private shiftTypeRepository: Repository<ShiftType>,
    private readonly staffRequestShiftsRepository: StaffRequestShiftsRepository,
  ) {}

  async create(createStaffRequestShiftDto: CreateStaffRequestShiftDto): Promise<StaffRequestShift> {
    // Find staff
    const staff = await this.staffRepository.findOne({
      where: { id: createStaffRequestShiftDto.staff_id }
    });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${createStaffRequestShiftDto.staff_id} not found`);
    }

    // Find shift types
    const shiftTypes = await this.shiftTypeRepository.findByIds(createStaffRequestShiftDto.available_shift_ids);
    if (shiftTypes.length !== createStaffRequestShiftDto.available_shift_ids.length) {
      throw new NotFoundException('One or more shift types not found');
    }

    // Create staff request shift
    const staffRequestShift = this.staffRequestShiftsRepository.create({
      staff,
      week_index: createStaffRequestShiftDto.week_index,
      year: createStaffRequestShiftDto.year,
      available_shifts: shiftTypes,
      status: createStaffRequestShiftDto.status || 'Pending'
    });

    return await this.staffRequestShiftsRepository.save(staffRequestShift);
  }

  async findAll(): Promise<StaffRequestShift[]> {
    return this.staffRequestShiftsRepository.find({
      relations: ['staff', 'available_shifts']
    });
  }

  async findOne(id: string): Promise<StaffRequestShift> {
    const staffRequestShift = await this.staffRequestShiftsRepository.findOne({
      where: { id },
      relations: ['staff', 'available_shifts']
    });
    if (!staffRequestShift) {
      throw new NotFoundException(`Staff Request Shift with ID ${id} not found`);
    }
    return staffRequestShift;
  }

  async update(id: string, updateStaffRequestShiftDto: UpdateStaffRequestShiftDto): Promise<StaffRequestShift> {
    const staffRequestShift = await this.findOne(id);
    
    if (updateStaffRequestShiftDto.staff_id) {
      const staff = await this.staffRepository.findOne({
        where: { id: updateStaffRequestShiftDto.staff_id }
      });
      if (!staff) {
        throw new NotFoundException(`Staff with ID ${updateStaffRequestShiftDto.staff_id} not found`);
      }
      staffRequestShift.staff = staff;
    }

    if (updateStaffRequestShiftDto.available_shift_ids) {
      const shiftTypes = await this.shiftTypeRepository.findByIds(updateStaffRequestShiftDto.available_shift_ids);
      if (shiftTypes.length !== updateStaffRequestShiftDto.available_shift_ids.length) {
        throw new NotFoundException('One or more shift types not found');
      }
      staffRequestShift.available_shifts = shiftTypes;
    }

    Object.assign(staffRequestShift, {
      week_index: updateStaffRequestShiftDto.week_index,
      year: updateStaffRequestShiftDto.year,
      status: updateStaffRequestShiftDto.status
    });

    return await this.staffRequestShiftsRepository.save(staffRequestShift);
  }

  async remove(id: string): Promise<void> {
    const staffRequestShift = await this.findOne(id);
    await this.staffRequestShiftsRepository.remove(staffRequestShift);
  }
} 