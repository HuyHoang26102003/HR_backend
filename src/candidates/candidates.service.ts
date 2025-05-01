import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const role = await this.jobRepository.findOneOrFail({ where: { id: createCandidateDto.role_id } });
    const candidate = this.candidateRepository.create({ ...createCandidateDto, role });
    return this.candidateRepository.save(candidate);
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<Candidate> {
    return this.candidateRepository.findOneOrFail({ where: { id }, relations: ['role'] });
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<Candidate> {
    const candidate = await this.findOne(id);
    if (updateCandidateDto.role_id) {
      candidate.role = await this.jobRepository.findOneOrFail({ where: { id: updateCandidateDto.role_id } });
    }
    Object.assign(candidate, updateCandidateDto);
    return this.candidateRepository.save(candidate);
  }

  async remove(id: string): Promise<void> {
    await this.candidateRepository.delete(id);
  }
}