import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './entities/payroll.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { SalaryDefinition } from 'src/salary_definitions/entities/salary_definition.entity';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { PayrollsRepository } from './payrolls.repository';

@Injectable()
export class PayrollsService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(SalaryDefinition)
    private salaryDefinitionRepository: Repository<SalaryDefinition>,
    private readonly payrollsRepository: PayrollsRepository,
  ) {}

  async create(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
    // Find staff
    const staff = await this.staffRepository.findOne({
      where: { id: createPayrollDto.staff_id }
    });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${createPayrollDto.staff_id} not found`);
    }

    // Find salary definition
    const salaryDefinition = await this.salaryDefinitionRepository.findOne({
      where: { id: createPayrollDto.salary_definition_id }
    });
    if (!salaryDefinition) {
      throw new NotFoundException(`Salary Definition with ID ${createPayrollDto.salary_definition_id} not found`);
    }

    // Create payroll
    const payroll = this.payrollsRepository.create({
      staff,
      salary_definition: salaryDefinition,
      pay_period: createPayrollDto.pay_period,
      total_hours_worked: createPayrollDto.total_hours_worked,
      total_pay: createPayrollDto.total_pay
    });

    return await this.payrollsRepository.save(payroll);
  }

  async findAll(): Promise<Payroll[]> {
    return this.payrollsRepository.find({
      relations: ['staff', 'salary_definition']
    });
  }

  async findOne(id: string): Promise<Payroll> {
    const payroll = await this.payrollsRepository.findOne({
      where: { id },
      relations: ['staff', 'salary_definition']
    });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }
    return payroll;
  }

  async update(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll> {
    const payroll = await this.findOne(id);
    
    if (updatePayrollDto.staff_id) {
      const staff = await this.staffRepository.findOne({
        where: { id: updatePayrollDto.staff_id }
      });
      if (!staff) {
        throw new NotFoundException(`Staff with ID ${updatePayrollDto.staff_id} not found`);
      }
      payroll.staff = staff;
    }

    if (updatePayrollDto.salary_definition_id) {
      const salaryDefinition = await this.salaryDefinitionRepository.findOne({
        where: { id: updatePayrollDto.salary_definition_id }
      });
      if (!salaryDefinition) {
        throw new NotFoundException(`Salary Definition with ID ${updatePayrollDto.salary_definition_id} not found`);
      }
      payroll.salary_definition = salaryDefinition;
    }

    Object.assign(payroll, {
      pay_period: updatePayrollDto.pay_period,
      total_hours_worked: updatePayrollDto.total_hours_worked,
      total_pay: updatePayrollDto.total_pay
    });

    return await this.payrollsRepository.save(payroll);
  }

  async remove(id: string): Promise<void> {
    const payroll = await this.findOne(id);
    await this.payrollsRepository.remove(payroll);
  }
}