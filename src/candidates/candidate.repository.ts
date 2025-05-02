import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateRepository extends Repository<Candidate> {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {
    super(
      candidateRepository.target,
      candidateRepository.manager,
      candidateRepository.queryRunner,
    );
  }
}