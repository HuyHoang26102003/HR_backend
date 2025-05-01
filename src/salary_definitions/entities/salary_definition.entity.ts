import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Job } from 'src/jobs/entities/job.entity';

@Entity('salary_definitions')
@Unique(['job']) // Ensures each job has at most one salary definition
export class SalaryDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, { nullable: false })
  job: Job;

  @Column({ type: 'float', nullable: false })
  hourly_wage: number;
}