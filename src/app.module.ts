import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobLevelsModule } from './job_levels/job_levels.module';
import { DepartmentsModule } from './departments/departments.module';
import { ShiftTypesModule } from './shift_types/shift_types.module';
import { SalaryDefinitionsModule } from './salary_definitions/salary_definitions.module';
import { LeaveTypesModule } from './leave_types/leave_types.module';
import { StaffLeavesModule } from './staff_leaves/staff_leaves.module';
import { ManagerReviewsModule } from './manager_reviews/manager_reviews.module';
import { AttendanceModule } from './attendances/attendances.module';
import { StaffModule } from './staffs/staffs.module';
import { PayrollModule } from './payrolls/payrolls.module';
import { CandidateModule } from './candidates/candidates.module';
import { ShiftModule } from './shifts/shifts.module';
import { JobModule } from './jobs/jobs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffRequestShiftsModule } from './staff_request_shifts/staff_request_shifts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: (ConfigService)) => {
        const dbUrl = configService.get<string>('NEON_URL');
        if (!dbUrl) {
          throw new Error('NEON_URL environment variable is not set');
        }
        return {
          type: 'postgres',
          url: dbUrl,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false, // Set to false in production
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [ConfigService],
    }),
    AttendanceModule,
    CandidateModule,
    DepartmentsModule,
    JobLevelsModule,
    JobModule,
    LeaveTypesModule,
    ManagerReviewsModule,
    PayrollModule,
    SalaryDefinitionsModule,
    StaffRequestShiftsModule,
    ShiftTypesModule,
    ShiftModule,
    StaffLeavesModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}