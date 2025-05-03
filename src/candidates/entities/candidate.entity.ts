import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  contact_phone: string;

  @Column({ nullable: false })
  contact_email: string;

  @ManyToOne(() => Job, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Job;

  @ManyToOne(() => JobLevel, { nullable: false })
  @JoinColumn({ name: 'job_level_id' }) // Explicitly define the foreign key column
  job_level: JobLevel;

  @Column({ nullable: false })
  resume: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected', 'Interviewing'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected' | 'Interviewing';
}
