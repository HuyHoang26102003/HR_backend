import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { SalaryDefinition } from 'src/salary_definitions/entities/salary_definition.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { PayrollService } from './payrolls.service';
import { PayrollController } from './payrolls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll, SalaryDefinition, Staff])],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}