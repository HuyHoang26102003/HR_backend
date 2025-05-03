import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffRequestShiftsService } from './staff_request_shifts.service';
import { CreateStaffRequestShiftDto } from './dto/create-staff_request_shift.dto';
import { UpdateStaffRequestShiftDto } from './dto/update-staff_request_shift.dto';

@Controller('staff-request-shifts')
export class StaffRequestShiftsController {
  constructor(private readonly staffRequestShiftsService: StaffRequestShiftsService) {}

  @Post()
  create(@Body() createStaffRequestShiftDto: CreateStaffRequestShiftDto) {
    return this.staffRequestShiftsService.create(createStaffRequestShiftDto);
  }

  @Get()
  findAll() {
    return this.staffRequestShiftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffRequestShiftsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffRequestShiftDto: UpdateStaffRequestShiftDto,
  ) {
    return this.staffRequestShiftsService.update(id, updateStaffRequestShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffRequestShiftsService.remove(id);
  }
} 