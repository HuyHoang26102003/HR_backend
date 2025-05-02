import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateShiftTypeDto } from './dto/create-shift_type.dto';
import { UpdateShiftTypeDto } from './dto/update-shift_type.dto';
import { ShiftType } from './entities/shift_type.entity';
import { ShiftTypesRepository } from './shift_types.repository';

@Injectable()
export class ShiftTypesService {
  constructor(
    private readonly shiftTypesRepository: ShiftTypesRepository,
  ) {}

  async findAll(): Promise<ShiftType[]> {
    return this.shiftTypesRepository.find();
  }

  async findOne(id: string): Promise<ShiftType> {
    const shiftType = await this.shiftTypesRepository.findOne({
      where: { id },
    });
    if (!shiftType) {
      throw new NotFoundException(`Shift Type with ID ${id} not found`);
    }
    return shiftType;
  }

  private validateTimeFormat(time: string): boolean {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    return timeRegex.test(time);
  }

  async create(createShiftTypeDto: CreateShiftTypeDto): Promise<ShiftType> {
    const { start_time, end_time } = createShiftTypeDto;

    // Validate time format
    if (!this.validateTimeFormat(start_time)) {
      throw new BadRequestException('start_time must be in format HH:mm:ss or HH:mm');
    }
    if (!this.validateTimeFormat(end_time)) {
      throw new BadRequestException('end_time must be in format HH:mm:ss or HH:mm');
    }

    // Ensure time has seconds
    const formattedStartTime = start_time.length === 5 ? `${start_time}:00` : start_time;
    const formattedEndTime = end_time.length === 5 ? `${end_time}:00` : end_time;

    const shiftType = this.shiftTypesRepository.create({
      ...createShiftTypeDto,
      start_time: formattedStartTime,
      end_time: formattedEndTime
    });

    return await this.shiftTypesRepository.save(shiftType);
  }

  async update(id: string, updateShiftTypeDto: UpdateShiftTypeDto): Promise<ShiftType> {
    const shiftType = await this.findOne(id);
    
    // Validate and format times if provided
    if (updateShiftTypeDto.start_time) {
      if (!this.validateTimeFormat(updateShiftTypeDto.start_time)) {
        throw new BadRequestException('start_time must be in format HH:mm:ss or HH:mm');
      }
      updateShiftTypeDto.start_time = updateShiftTypeDto.start_time.length === 5 
        ? `${updateShiftTypeDto.start_time}:00` 
        : updateShiftTypeDto.start_time;
    }

    if (updateShiftTypeDto.end_time) {
      if (!this.validateTimeFormat(updateShiftTypeDto.end_time)) {
        throw new BadRequestException('end_time must be in format HH:mm:ss or HH:mm');
      }
      updateShiftTypeDto.end_time = updateShiftTypeDto.end_time.length === 5 
        ? `${updateShiftTypeDto.end_time}:00` 
        : updateShiftTypeDto.end_time;
    }

    Object.assign(shiftType, updateShiftTypeDto);
    return await this.shiftTypesRepository.save(shiftType);
  }

  async remove(id: string): Promise<void> {
    const shiftType = await this.findOne(id);
    await this.shiftTypesRepository.remove(shiftType);
  }
}
