import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('job_levels')
export class JobLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;
}