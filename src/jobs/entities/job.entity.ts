import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from 'src/departments/entities/department.entity';
import { JobLevel } from 'src/job_levels/entities/job_level.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Department, { nullable: false })
  department: Department;

  @ManyToOne(() => JobLevel, { nullable: false })
  level: JobLevel;
}