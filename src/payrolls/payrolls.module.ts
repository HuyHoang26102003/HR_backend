import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { SalaryDefinition } from 'src/salary_definitions/entities/salary_definition.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { PayrollController } from './payrolls.controller';
import { PayrollsRepository } from './payrolls.repository';
import { PayrollsService } from './payrolls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll, SalaryDefinition, Staff])],
  controllers: [PayrollController],
  providers: [PayrollsService, PayrollsRepository],
  exports: [PayrollsService],
})
export class PayrollModule {}