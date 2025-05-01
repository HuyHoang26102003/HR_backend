import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobLevelsService } from './job_levels.service';
import { CreateJobLevelDto } from './dto/create-job_level.dto';
import { UpdateJobLevelDto } from './dto/update-job_level.dto';

@Controller('job-levels')
export class JobLevelsController {
  constructor(private readonly jobLevelsService: JobLevelsService) {}

  @Post()
  create(@Body() createJobLevelDto: CreateJobLevelDto) {
    return this.jobLevelsService.create(createJobLevelDto);
  }

  @Get()
  findAll() {
    return this.jobLevelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobLevelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobLevelDto: UpdateJobLevelDto) {
    return this.jobLevelsService.update(+id, updateJobLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobLevelsService.remove(+id);
  }
}
