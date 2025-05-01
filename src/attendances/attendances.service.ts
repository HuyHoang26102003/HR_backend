import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Staff } from 'src/staffs/entities/staff.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const staff = await this.staffRepository.findOneOrFail({ where: { id: createAttendanceDto.staff_id } });
    const attendance = this.attendanceRepository.create({ ...createAttendanceDto, staff });
    return this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({ relations: ['staff'] });
  }

  async findOne(id: string): Promise<Attendance> {
    return this.attendanceRepository.findOneOrFail({ where: { id }, relations: ['staff'] });
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.findOne(id);
    if (updateAttendanceDto.staff_id) {
      attendance.staff = await this.staffRepository.findOneOrFail({ where: { id: updateAttendanceDto.staff_id } });
    }
    Object.assign(attendance, updateAttendanceDto);
    return this.attendanceRepository.save(attendance);
  }

  async remove(id: string): Promise<void> {
    await this.attendanceRepository.delete(id);
  }
}