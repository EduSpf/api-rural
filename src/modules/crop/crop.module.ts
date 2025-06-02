import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Harvest } from '../harvest/entities/harvest.entity';
import { CropService } from './services/crop.service';
import { CropController } from './controllers/crop.controller';
import { CropRepository } from './repositories/crop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Harvest])],
  providers: [CropService, CropRepository],
  controllers: [CropController],
  exports: [CropRepository]
})
export class CropModule {}
