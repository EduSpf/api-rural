import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from './entities/harvest.entity';
import { Property } from '../property/entities/property.entity';
import { HarvestService } from './services/harvest.service';
import { HarvestController } from './controllers/harvest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Property])],
  providers: [HarvestService],
  controllers: [HarvestController],
})
export class HarvestModule {}
