import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectRepository(Property)
    private readonly repo: Repository<Property>,
  ) {}

  async create(data: Partial<Property>): Promise<Property> {
    return this.repo.save(this.repo.create(data));
  }

  async findById(id: string): Promise<Property | null> {
    return this.repo.findOne({ where: { id }, relations: ['producer'] });
  }

  async findAll(): Promise<Property[]> {
    return this.repo.find({ relations: ['producer'] });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
