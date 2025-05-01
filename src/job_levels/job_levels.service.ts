import { Injectable } from '@nestjs/common';
import { CreateJobLevelDto } from './dto/create-job_level.dto';
import { UpdateJobLevelDto } from './dto/update-job_level.dto';

@Injectable()
export class JobLevelsService {
  create(createJobLevelDto: CreateJobLevelDto) {
    return 'This action adds a new jobLevel';
  }

  findAll() {
    return `This action returns all jobLevels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobLevel`;
  }

  update(id: number, updateJobLevelDto: UpdateJobLevelDto) {
    return `This action updates a #${id} jobLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobLevel`;
  }
}
