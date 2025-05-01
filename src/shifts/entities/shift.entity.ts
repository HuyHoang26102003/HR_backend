import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';
import { ShiftType } from 'src/shift_types/entities/shift_type.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, { nullable: false })
  staff: Staff;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @ManyToOne(() => ShiftType, { nullable: false })
  shift_type: ShiftType;

  @ManyToOne(() => Job, { nullable: false })
  job: Job;
}