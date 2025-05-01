import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffLeavesService } from './staff_leaves.service';
import { CreateStaffLeaveDto } from './dto/create-staff_leaf.dto';
import { UpdateStaffLeaveDto } from './dto/update-staff_leaf.dto';

@Controller('staff-leaves')
export class StaffLeavesController {
  constructor(private readonly staffLeavesService: StaffLeavesService) {}

  @Post()
  create(@Body() createStaffLeafDto: CreateStaffLeaveDto) {
    return this.staffLeavesService.create(createStaffLeafDto);
  }

  @Get()
  findAll() {
    return this.staffLeavesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffLeavesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffLeafDto: UpdateStaffLeaveDto) {
    return this.staffLeavesService.update(+id, updateStaffLeafDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffLeavesService.remove(+id);
  }
}
