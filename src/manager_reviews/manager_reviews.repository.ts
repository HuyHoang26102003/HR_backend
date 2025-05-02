import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerReview } from './entities/manager_review.entity';

@Injectable()
export class ManagerReviewsRepository extends Repository<ManagerReview> {
  constructor(
    @InjectRepository(ManagerReview)
    private managerReviewsRepository: Repository<ManagerReview>,
  ) {
    super(
      managerReviewsRepository.target,
      managerReviewsRepository.manager,
      managerReviewsRepository.queryRunner,
    );
  }
} 