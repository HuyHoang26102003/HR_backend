import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './entities/payroll.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { SalaryDefinition } from 'src/salary_definitions/entities/salary_definition.entity';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(SalaryDefinition)
    private salaryDefinitionRepository: Repository<SalaryDefinition>,
  ) {}

  async create(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
    const staff = await this.staffRepository.findOneOrFail({ where: { id: createPayrollDto.staff_id } });
    const salaryDefinition = await this.salaryDefinitionRepository.findOneOrFail({ where: { id: createPayrollDto.salary_definition_id } });
    const payroll = this.payrollRepository.create({ ...createPayrollDto, staff, salary_definition: salaryDefinition });
    return this.payrollRepository.save(payroll);
  }

  async findAll(): Promise<Payroll[]> {
    return this.payrollRepository.find({ relations: ['staff', 'salary_definition'] });
  }

  async findOne(id: string): Promise<Payroll> {
    return this.payrollRepository.findOneOrFail({ where: { id }, relations: ['staff', 'salary_definition'] });
  }

  async update(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll> {
    const payroll = await this.findOne(id);
    if (updatePayrollDto.staff_id) {
      payroll.staff = await this.staffRepository.findOneOrFail({ where: { id: updatePayrollDto.staff_id } });
    }
    if (updatePayrollDto.salary_definition_id) {
      payroll.salary_definition = await this.salaryDefinitionRepository.findOneOrFail({ where: { id: updatePayrollDto.salary_definition_id } });
    }
    Object.assign(payroll, updatePayrollDto);
    return this.payrollRepository.save(payroll);
  }

  async remove(id: string): Promise<void> {
    await this.payrollRepository.delete(id);
  }
}