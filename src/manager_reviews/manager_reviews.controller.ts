import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ManagerReviewService } from './manager_reviews.service';
import { CreateManagerReviewDto } from './dto/create-manager_review.dto';
import { UpdateManagerReviewDto } from './dto/update-manager_review.dto';

@Controller('manager-reviews')
export class ManagerReviewController {
  constructor(private readonly managerReviewService: ManagerReviewService) {}

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