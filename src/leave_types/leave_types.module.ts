import { Module } from '@nestjs/common';
import { LeaveTypesService } from './leave_types.service';
import { LeaveTypesController } from './leave_types.controller';

@Module({
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService],
})
export class LeaveTypesModule {}
