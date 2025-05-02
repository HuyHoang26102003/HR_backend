import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftTypesService } from './shift_types.service';
import { ShiftTypesController } from './shift_types.controller';
import { ShiftType } from './entities/shift_type.entity';
import { ShiftTypesRepository } from './shift_types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftType])],
  controllers: [ShiftTypesController],
  providers: [ShiftTypesService, ShiftTypesRepository],
  exports: [ShiftTypesService],
})
export class ShiftTypesModule {}
