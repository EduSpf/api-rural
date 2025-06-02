import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertyService } from './services/property.service';
import { PropertyController } from './controllers/property.controller';
import { Producer } from '../producer/entities/producer.entity';
import { AreaValidation } from './validators/area.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Producer])],
  controllers: [PropertyController],
  providers: [PropertyService, AreaValidation],
})
export class PropertyModule {}
