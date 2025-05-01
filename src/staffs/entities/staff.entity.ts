import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';
import { ManagerReview } from 'src/manager_reviews/entities/manager_review.entity';

@Entity('staffs')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  employee_id: string;

  @ManyToOne(() => Job, { nullable: false })
  job: Job;

  @ManyToOne(() => JobLevel)
  job_level: JobLevel;

  @Column('jsonb', { nullable: false })
  on_board: { is_on_board: boolean; start_date: Date; end_date?: Date };

  @OneToMany(() => ManagerReview, (review) => review.staff)
  manager_reviews: ManagerReview[];

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'date', nullable: false })
  start_date: Date;

  @Column({
    type: 'enum',
    enum: ['Active', 'Terminated'],
    default: 'Active',
  })
  status: 'Active' | 'Terminated';

  @Column('jsonb', { nullable: true })
  avatar: { key: string; url: string } | null;

  @Column({ default: false })
  is_part_time: boolean;

  @Column({
    type: 'enum',
    enum: ['Male', 'Female', 'Other'],
    default: 'Other',
  })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date;

  @Column({ nullable: false })
  national_id_card: string;

  @Column({ default: 0, nullable: false })
  leave_days_taken: number;
}