import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from '../entities/harvest.entity';

@Injectable()
export class HarvestRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repo: Repository<Harvest>,
  ) {}

  async create(data: Partial<Harvest>): Promise<Harvest> {
    return this.repo.save(this.repo.create(data));
  }

  async findById(id: string): Promise<Harvest | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['property', 'crops'],
    });
  }

  async findAll(): Promise<Harvest[]> {
    return this.repo.find({ relations: ['property', 'crops'] });
  }

  async update(id: string, data: Partial<Harvest>): Promise<Harvest> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException('Safra não encontrada');

    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
