import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';
import { SalaryDefinition } from 'src/salary_definitions/entities/salary_definition.entity';

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, { nullable: false })
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @Column({ nullable: false })
  pay_period: string;

  @ManyToOne(() => SalaryDefinition, { nullable: false })
  @JoinColumn({ name: 'salary_definition_id' })
  salary_definition: SalaryDefinition;

  @Column({ type: 'float', nullable: false })
  total_hours_worked: number;

  @Column({ type: 'float', nullable: false })
  total_pay: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Processed'],
    default: 'Pending',
  })
  status: 'Pending' | 'Processed';
}