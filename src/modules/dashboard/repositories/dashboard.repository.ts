import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../property/entities/property.entity';

@Injectable()
export class DashboardRepository {
  constructor(
    @InjectRepository(Property)
    private readonly repo: Repository<Property>,
  ) {}

  async findAllWithRelations(): Promise<Property[]> {
    return this.repo.find({
      relations: ['harvests', 'harvests.crops'],
    });
  }
}
