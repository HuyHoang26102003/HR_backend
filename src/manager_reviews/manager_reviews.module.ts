import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerReviewsService } from './manager_reviews.service';
import { ManagerReview } from './entities/manager_review.entity';
import { ManagerReviewsRepository } from './manager_reviews.repository';
import { ManagerReviewController } from './manager_reviews.controller';
import { Staff } from 'src/staffs/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerReview, Staff])],
  controllers: [ManagerReviewController],
  providers: [ManagerReviewsService, ManagerReviewsRepository],
  exports: [ManagerReviewsService],
})
export class ManagerReviewsModule {}
