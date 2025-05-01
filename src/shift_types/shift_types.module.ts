import { Module } from '@nestjs/common';
import { ShiftTypesService } from './shift_types.service';
import { ShiftTypesController } from './shift_types.controller';

@Module({
  controllers: [ShiftTypesController],
  providers: [ShiftTypesService],
})
export class ShiftTypesModule {}
