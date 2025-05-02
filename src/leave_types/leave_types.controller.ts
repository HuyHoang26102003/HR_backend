import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveTypesService } from './leave_types.service';
import { CreateLeaveTypeDto } from './dto/create-leave_type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave_type.dto';

@Controller('leave-types')
export class LeaveTypesController {
  constructor(private readonly leaveTypesService: LeaveTypesService) {}

  @Post()
  create(@Body() createLeaveTypeDto: CreateLeaveTypeDto) {
    return this.leaveTypesService.create(createLeaveTypeDto);
  }

  @Get()
  findAll() {
    return this.leaveTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveTypeDto: UpdateLeaveTypeDto) {
    return this.leaveTypesService.update(id, updateLeaveTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveTypesService.remove(id);
  }
}
