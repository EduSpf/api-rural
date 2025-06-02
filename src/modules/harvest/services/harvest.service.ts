import { Injectable } from '@nestjs/common';
import { HarvestRepository } from '../repositories/harvest.repository';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { Harvest } from '../entities/harvest.entity';

@Injectable()
export class HarvestService {
  constructor(private readonly harvestRepo: HarvestRepository) {}

  create(dto: CreateHarvestDto): Promise<Harvest> {
    return this.harvestRepo.create(dto);
  }

  findAll(): Promise<Harvest[]> {
    return this.harvestRepo.findAll();
  }

  findOne(id: string): Promise<Harvest| null> {
    return this.harvestRepo.findById(id);
  }

  update(id: string, dto: UpdateHarvestDto): Promise<Harvest> {
    return this.harvestRepo.update(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.harvestRepo.delete(id);
  }
}
