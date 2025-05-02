import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/create-leave_type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave_type.dto';
import { LeaveType } from './entities/leave_type.entity';
import { LeaveTypesRepository } from './leave_types.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveTypesService {
  constructor(
    private readonly leaveTypesRepository: LeaveTypesRepository,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async findAll(): Promise<LeaveType[]> {
    return this.leaveTypesRepository.find({
      relations: ['job']
    });
  }

  async findOne(id: string): Promise<LeaveType> {
    const leaveType = await this.leaveTypesRepository.findOne({
      where: { id },
      relations: ['job']
    });
    if (!leaveType) {
      throw new NotFoundException(`Leave Type with ID ${id} not found`);
    }
    return leaveType;
  }

  async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    const { job_id, ...leaveTypeData } = createLeaveTypeDto;
    
    const job = await this.jobRepository.findOne({ where: { id: job_id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${job_id} not found`);
    }

    const leaveType = this.leaveTypesRepository.create({
      ...leaveTypeData,
      job // Set the job relation directly
    });

    return await this.leaveTypesRepository.save(leaveType);
  }

  async update(id: string, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType> {
    const leaveType = await this.findOne(id);
    
    if (updateLeaveTypeDto.job_id) {
      const job = await this.jobRepository.findOne({ 
        where: { id: updateLeaveTypeDto.job_id } 
      });
      if (!job) {
        throw new NotFoundException(`Job with ID ${updateLeaveTypeDto.job_id} not found`);
      }
      leaveType.job = job;
    }
    
    Object.assign(leaveType, {
      max_days_leave: updateLeaveTypeDto.max_days_leave,
      percentage_earn: updateLeaveTypeDto.percentage_earn
    });
    
    return await this.leaveTypesRepository.save(leaveType);
  }

  async remove(id: string): Promise<void> {
    const leaveType = await this.findOne(id);
    await this.leaveTypesRepository.remove(leaveType);
  }
}
