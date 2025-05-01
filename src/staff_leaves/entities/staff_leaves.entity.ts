import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';
import { LeaveType } from 'src/leave_types/entities/leave_type.entity';

@Entity('staff_leave')
export class StaffLeave {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, { nullable: false })
  staff: Staff;

  @ManyToOne(() => LeaveType, { nullable: false })
  leave_type: LeaveType;

  @Column({ type: 'date', nullable: false })
  start_date: Date;

  @Column({ type: 'date', nullable: false })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected';
}