import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';

@Entity('manager_reviews')
export class ManagerReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, (staff) => staff.manager_reviews, { nullable: false })
  staff: Staff;

  @Column({ nullable: true })
  performance_review: string;

  @Column({ nullable: true })
  morale_review: string;
}