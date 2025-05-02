import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffsRepository } from './staffs.repository';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(JobLevel)
    private jobLevelRepository: Repository<JobLevel>,
    private readonly staffsRepository: StaffsRepository,
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const job = await this.jobRepository.findOneOrFail({ where: { id: createStaffDto.job_id } });
    let jobLevel: JobLevel | undefined;
    if (createStaffDto.job_level_id) {
      jobLevel = await this.jobLevelRepository.findOneOrFail({ where: { id: createStaffDto.job_level_id } });
    }
    const staff = this.staffRepository.create({
      ...createStaffDto,
      job,
      job_level: jobLevel,
    });
    return this.staffRepository.save(staff);
  }

  async findAll(): Promise<Staff[]> {
    return this.staffsRepository.find();
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.staffsRepository.findOne({
      where: { id },
    });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.findOne(id);
    if (updateStaffDto.job_id) {
      staff.job = await this.jobRepository.findOneOrFail({ where: { id: updateStaffDto.job_id } });
    }
    if (updateStaffDto.job_level_id) {
      staff.job_level = await this.jobLevelRepository.findOneOrFail({ where: { id: updateStaffDto.job_level_id } });
    }
    Object.assign(staff, updateStaffDto);
    return this.staffRepository.save(staff);
  }

  async remove(id: string): Promise<void> {
    const staff = await this.findOne(id);
    await this.staffsRepository.remove(staff);
  }
}