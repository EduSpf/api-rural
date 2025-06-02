import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../property/entities/property.entity';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { DashboardRepository } from './repositories/dashboard.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
  exports: [DashboardRepository]
})
export class DashboardModule {}
