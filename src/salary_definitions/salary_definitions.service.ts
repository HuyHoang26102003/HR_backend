import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaryDefinitionDto } from './dto/create-salary_definition.dto';
import { UpdateSalaryDefinitionDto } from './dto/update-salary_definition.dto';
import { SalaryDefinition } from './entities/salary_definition.entity';
import { SalaryDefinitionsRepository } from './salary_definitions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaryDefinitionsService {
  constructor(
    private readonly salaryDefinitionsRepository: SalaryDefinitionsRepository,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async findAll(): Promise<SalaryDefinition[]> {
    return this.salaryDefinitionsRepository.find();
  }

  async findOne(id: string): Promise<SalaryDefinition> {
    const salaryDefinition = await this.salaryDefinitionsRepository.findOne({
      where: { id },
    });
    if (!salaryDefinition) {
      throw new NotFoundException(`Salary Definition with ID ${id} not found`);
    }
    return salaryDefinition;
  }

  async create(createSalaryDefinitionDto: CreateSalaryDefinitionDto): Promise<SalaryDefinition> {
    const job = await this.jobRepository.findOne({ where: { id: createSalaryDefinitionDto.job_id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${createSalaryDefinitionDto.job_id } not found`);
    }
    const salaryDefinition = this.salaryDefinitionsRepository.create({...createSalaryDefinitionDto,job} );
    return this.salaryDefinitionsRepository.save(salaryDefinition);
  }

  async update(id: string, updateSalaryDefinitionDto: UpdateSalaryDefinitionDto): Promise<SalaryDefinition> {
    const salaryDefinition = await this.findOne(id);
    Object.assign(salaryDefinition, updateSalaryDefinitionDto);
    return this.salaryDefinitionsRepository.save(salaryDefinition);
  }

  async remove(id: string): Promise<void> {
    const salaryDefinition = await this.findOne(id);
    await this.salaryDefinitionsRepository.remove(salaryDefinition);
  }
}
