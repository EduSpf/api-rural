import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from './entities/harvest.entity';
import { Property } from '../property/entities/property.entity';
import { HarvestService } from './services/harvest.service';
import { HarvestController } from './controllers/harvest.controller';
import { HarvestRepository } from './repositories/harvest.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Property])],
  providers: [HarvestService, HarvestRepository],
  controllers: [HarvestController],
  exports: [HarvestRepository]
})
export class HarvestModule {}
