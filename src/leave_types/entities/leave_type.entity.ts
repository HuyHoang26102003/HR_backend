import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Job } from 'src/jobs/entities/job.entity';

@Entity('leave_types')
export class LeaveType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, { nullable: false })
  job: Job;

  @Column({ nullable: false })
  max_days_leave: number;

  @Column({ type: 'float', nullable: false })
  percentage_earn: number;
}