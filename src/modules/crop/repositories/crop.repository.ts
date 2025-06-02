import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../entities/crop.entity';
import { Harvest } from '../../harvest/entities/harvest.entity';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';

@Injectable()
export class CropRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepo: Repository<Crop>,
    @InjectRepository(Harvest)
    private readonly harvestRepo: Repository<Harvest>,
  ) {}

  async create(dto: CreateCropDto): Promise<Crop> {
    const harvest = await this.harvestRepo.findOne({ where: { id: dto.harvestId } });
    if (!harvest) throw new NotFoundException('Safra não encontrada');

    const crop = this.cropRepo.create({ name: dto.name, harvest });
    return this.cropRepo.save(crop);
  }

  async findAll(): Promise<Crop[]> {
    return this.cropRepo.find({ relations: ['harvest'] });
  }

  async findById(id: string): Promise<Crop> {
    const crop = await this.cropRepo.findOne({ where: { id }, relations: ['harvest'] });
    if (!crop) throw new NotFoundException('Cultura não encontrada');
    return crop;
  }

  async update(id: string, dto: UpdateCropDto): Promise<Crop> {
    const crop = await this.findById(id);

    if (dto.harvestId) {
      const harvest = await this.harvestRepo.findOne({ where: { id: dto.harvestId } });
      if (!harvest) throw new NotFoundException('Safra não encontrada');
      crop.harvest = harvest;
    }

    crop.name = dto.name ?? crop.name;
    return this.cropRepo.save(crop);
  }

  async delete(id: string): Promise<void> {
    const crop = await this.findById(id);
    await this.cropRepo.remove(crop);
  }
}
