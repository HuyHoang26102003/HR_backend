import { Module } from '@nestjs/common';
import { ManagerReviewController } from './manager_reviews.controller';
import { ManagerReviewService } from './manager_reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerReview } from './entities/manager_review.entity';
import { Staff } from 'src/staffs/entities/staff.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ManagerReview, Staff])],  
  controllers: [ManagerReviewController],
  providers: [ManagerReviewService],
})
export class ManagerReviewsModule {}
