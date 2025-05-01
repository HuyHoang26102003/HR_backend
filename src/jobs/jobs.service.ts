import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { Department } from 'src/departments/entities/department.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(JobLevel)
    private jobLevelRepository: Repository<JobLevel>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const department = await this.departmentRepository.findOneOrFail({ where: { id: createJobDto.department_id } });
    const level = await this.jobLevelRepository.findOneOrFail({ where: { id: createJobDto.level_id } });
    const job = this.jobRepository.create({ ...createJobDto, department, level });
    return this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ['department', 'level'] });
  }

  async findOne(id: string): Promise<Job> {
    return this.jobRepository.findOneOrFail({ where: { id }, relations: ['department', 'level'] });
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    if (updateJobDto.department_id) {
      job.department = await this.departmentRepository.findOneOrFail({ where: { id: updateJobDto.department_id } });
    }
    if (updateJobDto.level_id) {
      job.level = await this.jobLevelRepository.findOneOrFail({ where: { id: updateJobDto.level_id } });
    }
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    await this.jobRepository.delete(id);
  }
} 