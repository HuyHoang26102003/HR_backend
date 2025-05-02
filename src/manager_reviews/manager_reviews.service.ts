import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerReview } from './entities/manager_review.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { CreateManagerReviewDto } from './dto/create-manager_review.dto';
import { UpdateManagerReviewDto } from './dto/update-manager_review.dto';
import { ManagerReviewsRepository } from './manager_reviews.repository';

@Injectable()
export class ManagerReviewsService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private readonly managerReviewsRepository: ManagerReviewsRepository,
  ) {}

  async create(createManagerReviewDto: CreateManagerReviewDto): Promise<ManagerReview> {
    const { staff_id, ...remainingmrd } = createManagerReviewDto;
    const staff = await this.staffRepository.findOneOrFail({ where: { id: staff_id } });
    
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${staff_id} not found`);
    }

    const manangerReview = this.managerReviewsRepository.create({
      ...remainingmrd,
      staff // Set the job relation directly
    });

    return await this.managerReviewsRepository.save(manangerReview);
  }

  async findAll(): Promise<ManagerReview[]> {
    return this.managerReviewsRepository.find();
  }

  async findOne(id: string): Promise<ManagerReview> {
    const managerReview = await this.managerReviewsRepository.findOne({
      where: { id },
    });
    if (!managerReview) {
      throw new NotFoundException(`Manager Review with ID ${id} not found`);
    }
    return managerReview;
  }

  async update(id: string, updateManagerReviewDto: UpdateManagerReviewDto): Promise<ManagerReview> {
    const managerReview = await this.findOne(id);
    if (updateManagerReviewDto.staff_id) {
      managerReview.staff = await this.staffRepository.findOneOrFail({ where: { id: updateManagerReviewDto.staff_id } });
    }
    Object.assign(managerReview, updateManagerReviewDto);
    return this.managerReviewsRepository.save(managerReview);
  }

  async remove(id: string): Promise<void> {
    const managerReview = await this.findOne(id);
    await this.managerReviewsRepository.remove(managerReview);
  }
}