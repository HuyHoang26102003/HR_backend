import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryDefinitionsService } from './salary_definitions.service';
import { SalaryDefinitionsController } from './salary_definitions.controller';
import { SalaryDefinition } from './entities/salary_definition.entity';
import { SalaryDefinitionsRepository } from './salary_definitions.repository';
import { Job } from 'src/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalaryDefinition, Job])],
  controllers: [SalaryDefinitionsController],
  providers: [SalaryDefinitionsService, SalaryDefinitionsRepository],
  exports: [SalaryDefinitionsService],
})
export class SalaryDefinitionsModule {}
