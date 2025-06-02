// src/modules/crop/services/crop.service.ts
import { Injectable } from '@nestjs/common';
import { CropRepository } from '../repositories/crop.repository';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { Crop } from '../entities/crop.entity';

@Injectable()
export class CropService {
  constructor(private readonly cropRepository: CropRepository) {}

  create(dto: CreateCropDto): Promise<Crop> {
    return this.cropRepository.create(dto);
  }

  findAll(): Promise<Crop[]> {
    return this.cropRepository.findAll();
  }

  findOne(id: string): Promise<Crop> {
    return this.cropRepository.findById(id);
  }

  update(id: string, dto: UpdateCropDto): Promise<Crop> {
    return this.cropRepository.update(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.cropRepository.delete(id);
  }
}
