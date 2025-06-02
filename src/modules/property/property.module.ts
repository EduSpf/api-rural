import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertyService } from './services/property.service';
import { PropertyController } from './controllers/property.controller';
import { Producer } from '../producer/entities/producer.entity';
import { AreaValidation } from './validators/area.validator';
import { PropertyRepository } from './repositories/property.repository';
import { ProducerModule } from '../producer/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Producer]), ProducerModule],
  controllers: [PropertyController],
  providers: [PropertyService, AreaValidation, PropertyRepository],
  exports: [PropertyRepository]
})
export class PropertyModule { }
