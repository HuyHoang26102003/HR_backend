import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Job } from '../jobs/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CandidateRepository } from './candidate.repository';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';

@Injectable()
export class CandidateService {
  constructor(
    private readonly candidateRepository: CandidateRepository,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobLevel)
    private readonly jobLevelRepository: Repository<JobLevel>,
  ) {}

  async findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    return candidate;
  }

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const { role_id, job_level_id, ...candidateData } = createCandidateDto;
    const job = await this.jobRepository.findOne({ where: { id: role_id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${role_id} not found`);
    }
    const jl = await this.jobLevelRepository.findOne({ where: { id: job_level_id } });
    if (!jl) {
      throw new NotFoundException(`Job level with ID ${role_id} not found`);
    }

    const candidate = await this.candidateRepository.create({
      ...candidateData,
      role: job,
      job_level: jl
    });
    return this.candidateRepository.save(candidate);
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<Candidate> {
    const candidate = await this.findOne(id);
    const { role_id, ...updateData } = updateCandidateDto;

    if (role_id) {
      const job = await this.jobRepository.findOne({ where: { id: role_id } });
      if (!job) {
        throw new NotFoundException(`Job with ID ${role_id} not found`);
      }
      candidate.role = job;
    }

    Object.assign(candidate, updateData);
    return this.candidateRepository.save(candidate);
  }

  async remove(id: string): Promise<void> {
    const candidate = await this.findOne(id);
    await this.candidateRepository.remove(candidate);
  }
}