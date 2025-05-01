import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shift_types')
export class ShiftType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: 'time', nullable: false })
  start_time: string;

  @Column({ type: 'time', nullable: false })
  end_time: string;
}