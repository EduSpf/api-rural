import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Harvest } from '../harvest/entities/harvest.entity';
import { CropService } from './services/crop.service';
import { CropController } from './controllers/crop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Harvest])],
  providers: [CropService],
  controllers: [CropController],
})
export class CropModule {}
