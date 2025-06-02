import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from '../entities/harvest.entity';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { Property } from '../../property/entities/property.entity';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepo: Repository<Harvest>,
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  async create(dto: CreateHarvestDto): Promise<Harvest> {
    const property = await this.propertyRepo.findOne({ where: { id: dto.propertyId } });
    if (!property) throw new NotFoundException('Propriedade não encontrada');

    const harvest = this.harvestRepo.create({ year: dto.year, property });
    return this.harvestRepo.save(harvest);
  }

  findAll(): Promise<Harvest[]> {
    return this.harvestRepo.find({ relations: ['property', 'crops'] });
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepo.findOne({ where: { id }, relations: ['property', 'crops'] });
    if (!harvest) throw new NotFoundException('Safra não encontrada');
    return harvest;
  }

  async update(id: string, dto: UpdateHarvestDto): Promise<Harvest> {
    const harvest = await this.findOne(id);

    if (dto.propertyId) {
      const property = await this.propertyRepo.findOne({ where: { id: dto.propertyId } });
      if (!property) throw new NotFoundException('Propriedade não encontrada');
      harvest.property = property;
    }

    harvest.year = dto.year ?? harvest.year;
    return this.harvestRepo.save(harvest);
  }

  async remove(id: string): Promise<void> {
    const harvest = await this.findOne(id);
    await this.harvestRepo.remove(harvest);
  }
}
