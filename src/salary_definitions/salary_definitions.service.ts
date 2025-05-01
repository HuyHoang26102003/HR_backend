import { Injectable } from '@nestjs/common';
import { CreateSalaryDefinitionDto } from './dto/create-salary_definition.dto';
import { UpdateSalaryDefinitionDto } from './dto/update-salary_definition.dto';

@Injectable()
export class SalaryDefinitionsService {
  create(createSalaryDefinitionDto: CreateSalaryDefinitionDto) {
    return 'This action adds a new salaryDefinition';
  }

  findAll() {
    return `This action returns all salaryDefinitions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaryDefinition`;
  }

  update(id: number, updateSalaryDefinitionDto: UpdateSalaryDefinitionDto) {
    return `This action updates a #${id} salaryDefinition`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaryDefinition`;
  }
}
