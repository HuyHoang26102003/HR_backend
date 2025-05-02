import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobLevelDto } from './dto/create-job_level.dto';
import { UpdateJobLevelDto } from './dto/update-job_level.dto';
import { JobLevelsRepository } from './job_levels.repository';
import { JobLevel } from './entities/job_level.entity';

@Injectable()
export class JobLevelsService {
  constructor(private readonly jobLevelsRepository: JobLevelsRepository) {}

  async create(createJobLevelDto: CreateJobLevelDto): Promise<JobLevel> {
    const jobLevel = this.jobLevelsRepository.create(createJobLevelDto);
    return await this.jobLevelsRepository.save(jobLevel);
  }

  async findAll(): Promise<JobLevel[]> {
    return await this.jobLevelsRepository.find();
  }

  async findOne(id: string): Promise<JobLevel> {
    const jobLevel = await this.jobLevelsRepository.findOne({ where: { id } });
    if (!jobLevel) {
      throw new NotFoundException(`Job level with ID "${id}" not found`);
    }
    return jobLevel;
  }

  async update(id: string, updateJobLevelDto: UpdateJobLevelDto): Promise<JobLevel> {
    const jobLevel = await this.findOne(id);
    this.jobLevelsRepository.merge(jobLevel, updateJobLevelDto);
    return await this.jobLevelsRepository.save(jobLevel);
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobLevelsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job level with ID "${id}" not found`);
    }
  }
}
