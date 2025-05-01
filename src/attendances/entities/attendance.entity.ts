import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, { nullable: false })
  staff: Staff;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'time', nullable: true })
  check_in: string | null;

  @Column({ type: 'time', nullable: true })
  check_out: string | null;

  @Column({
    type: 'enum',
    enum: ['Present', 'Absent'],
    nullable: false,
  })
  status: 'Present' | 'Absent';

  @Column({ type: 'float', nullable: true })
  hours_worked: number | null;
}