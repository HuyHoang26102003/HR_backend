import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { Department } from 'src/departments/entities/department.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(JobLevel)
    private readonly jobLevelRepository: Repository<JobLevel>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const department = await this.departmentRepository.findOne({ 
      where: { id: createJobDto.department_id } 
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${createJobDto.department_id} not found`);
    }

    const level = await this.jobLevelRepository.findOne({ 
      where: { id: createJobDto.level_id } 
    });
    if (!level) {
      throw new NotFoundException(`Job Level with ID ${createJobDto.level_id} not found`);
    }

    const job = this.jobRepository.create({ ...createJobDto, department, level });
    return this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ['department', 'level'] });
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ 
      where: { id }, 
      relations: ['department', 'level'] 
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);

    if (updateJobDto.department_id) {
      const department = await this.departmentRepository.findOne({ 
        where: { id: updateJobDto.department_id } 
      });
      if (!department) {
        throw new NotFoundException(`Department with ID ${updateJobDto.department_id} not found`);
      }
      job.department = department;
    }

    if (updateJobDto.level_id) {
      const level = await this.jobLevelRepository.findOne({ 
        where: { id: updateJobDto.level_id } 
      });
      if (!level) {
        throw new NotFoundException(`Job Level with ID ${updateJobDto.level_id} not found`);
      }
      job.level = level;
    }

    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }
} 