import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateManagerReviewDto } from './dto/create-manager_review.dto';
import { UpdateManagerReviewDto } from './dto/update-manager_review.dto';
import { ManagerReviewsService } from './manager_reviews.service';

@Controller('manager-reviews')
export class ManagerReviewController {
  constructor(private readonly managerReviewService: ManagerReviewsService) {}

  @Post()
  create(@Body() createManagerReviewDto: CreateManagerReviewDto) {
    return this.managerReviewService.create(createManagerReviewDto);
  }

  @Get()
  findAll() {
    return this.managerReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerReviewService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerReviewDto: UpdateManagerReviewDto) {
    return this.managerReviewService.update(id, updateManagerReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerReviewService.remove(id);
  }
}