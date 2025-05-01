import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerReview } from './entities/manager_review.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { CreateManagerReviewDto } from './dto/create-manager_review.dto';
import { UpdateManagerReviewDto } from './dto/update-manager_review.dto';

@Injectable()
export class ManagerReviewService {
  constructor(
    @InjectRepository(ManagerReview)
    private managerReviewRepository: Repository<ManagerReview>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async create(createManagerReviewDto: CreateManagerReviewDto): Promise<ManagerReview> {
    const staff = await this.staffRepository.findOneOrFail({ where: { id: createManagerReviewDto.staff_id } });
    const review = this.managerReviewRepository.create({ ...createManagerReviewDto, staff });
    return this.managerReviewRepository.save(review);
  }

  async findAll(): Promise<ManagerReview[]> {
    return this.managerReviewRepository.find({ relations: ['staff'] });
  }

  async findOne(id: string): Promise<ManagerReview> {
    return this.managerReviewRepository.findOneOrFail({ where: { id }, relations: ['staff'] });
  }

  async update(id: string, updateManagerReviewDto: UpdateManagerReviewDto): Promise<ManagerReview> {
    const review = await this.findOne(id);
    if (updateManagerReviewDto.staff_id) {
      review.staff = await this.staffRepository.findOneOrFail({ where: { id: updateManagerReviewDto.staff_id } });
    }
    Object.assign(review, updateManagerReviewDto);
    return this.managerReviewRepository.save(review);
  }

  async remove(id: string): Promise<void> {
    await this.managerReviewRepository.delete(id);
  }
}