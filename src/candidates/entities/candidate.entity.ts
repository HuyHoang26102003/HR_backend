import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Job } from 'src/jobs/entities/job.entity';

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
  role: Job;

  @Column({ nullable: false })
  resume: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected', 'Interviewing'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected' | 'Interviewing';
}