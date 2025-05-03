import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';
import { ShiftType } from 'src/shift_types/entities/shift_type.entity';

@Entity('staff_request_shifts')
export class StaffRequestShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, { nullable: false })
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @Column({ type: 'int', nullable: false })
  week_index: number;

  @Column({ type: 'int', nullable: false })
  year: number;

  @ManyToMany(() => ShiftType)
  @JoinTable({
    name: 'staff_request_shift_types',
    joinColumn: {
      name: 'staff_request_shift_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'shift_type_id',
      referencedColumnName: 'id'
    }
  })
  available_shifts: ShiftType[];

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected';

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
} 