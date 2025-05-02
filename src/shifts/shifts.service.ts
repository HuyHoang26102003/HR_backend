import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './entities/shift.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { ShiftType } from 'src/shift_types/entities/shift_type.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftsRepository } from './shifts.repository';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(ShiftType)
    private shiftTypeRepository: Repository<ShiftType>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private readonly shiftsRepository: ShiftsRepository,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const staff = await this.staffRepository.findOneOrFail({ where: { id: createShiftDto.staff_id } });
    const shiftType = await this.shiftTypeRepository.findOneOrFail({ where: { id: createShiftDto.shift_type_id } });
    const job = await this.jobRepository.findOneOrFail({ where: { id: createShiftDto.job_id } });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${createShiftDto.staff_id} not found`);
    }
    if (!shiftType) {
      throw new NotFoundException(`Shift Type with ID ${createShiftDto.shift_type_id} not found`);
    }
    if (!job) {
      throw new NotFoundException(`Job with ID ${createShiftDto.job_id} not found`);
    }
    const shift = this.shiftRepository.create({ ...createShiftDto, staff, shift_type: shiftType, job });
    return this.shiftRepository.save(shift);
  }

  async findAll(): Promise<Shift[]> {
    return this.shiftsRepository.find();
  }

  async findOne(id: string): Promise<Shift> {
    const shift = await this.shiftsRepository.findOne({
      where: { id },
    });
    if (!shift) {
      throw new NotFoundException(`Shift with ID ${id} not found`);
    }
    return shift;
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.findOne(id);
    if (updateShiftDto.staff_id) {
      shift.staff = await this.staffRepository.findOneOrFail({ where: { id: updateShiftDto.staff_id } });
    }
    if (updateShiftDto.shift_type_id) {
      shift.shift_type = await this.shiftTypeRepository.findOneOrFail({ where: { id: updateShiftDto.shift_type_id } });
    }
    if (updateShiftDto.job_id) {
      shift.job = await this.jobRepository.findOneOrFail({ where: { id: updateShiftDto.job_id } });
    }
    Object.assign(shift, updateShiftDto);
    return this.shiftRepository.save(shift);
  }

  async remove(id: string): Promise<void> {
    const shift = await this.findOne(id);
    await this.shiftsRepository.remove(shift);
  }
}