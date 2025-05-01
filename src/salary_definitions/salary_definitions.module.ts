import { Module } from '@nestjs/common';
import { SalaryDefinitionsService } from './salary_definitions.service';
import { SalaryDefinitionsController } from './salary_definitions.controller';

@Module({
  controllers: [SalaryDefinitionsController],
  providers: [SalaryDefinitionsService],
})
export class SalaryDefinitionsModule {}
