import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(JobLevel)
    private jobLevelRepository: Repository<JobLevel>,
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
    return this.staffRepository.find({ relations: ['job', 'job_level', 'manager_reviews'] });
  }

  async findOne(id: string): Promise<Staff> {
    return this.staffRepository.findOneOrFail({ where: { id }, relations: ['job', 'job_level', 'manager_reviews'] });
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
    await this.staffRepository.delete(id);
  }
}