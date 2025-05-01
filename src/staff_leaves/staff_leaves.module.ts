import { Module } from '@nestjs/common';
import { StaffLeavesService } from './staff_leaves.service';
import { StaffLeavesController } from './staff_leaves.controller';

@Module({
  controllers: [StaffLeavesController],
  providers: [StaffLeavesService],
})
export class StaffLeavesModule {}
