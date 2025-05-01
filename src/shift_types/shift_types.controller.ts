import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftTypesService } from './shift_types.service';
import { CreateShiftTypeDto } from './dto/create-shift_type.dto';
import { UpdateShiftTypeDto } from './dto/update-shift_type.dto';

@Controller('shift-types')
export class ShiftTypesController {
  constructor(private readonly shiftTypesService: ShiftTypesService) {}

  @Post()
  create(@Body() createShiftTypeDto: CreateShiftTypeDto) {
    return this.shiftTypesService.create(createShiftTypeDto);
  }

  @Get()
  findAll() {
    return this.shiftTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftTypeDto: UpdateShiftTypeDto) {
    return this.shiftTypesService.update(+id, updateShiftTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftTypesService.remove(+id);
  }
}
