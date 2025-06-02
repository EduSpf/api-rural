import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producer.dto';

@Injectable()
export class ProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly ormRepo: Repository<Producer>,
  ) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    const entity = this.ormRepo.create(dto);
    return this.ormRepo.save(entity);
  }

  async findAll(): Promise<Producer[]> {
    return this.ormRepo.find({ relations: ['properties'] });
  }

  async findById(id: string): Promise<Producer | null> {
    return this.ormRepo.findOne({ where: { id }, relations: ['properties'] });
  }

  async findByDocument(document: string): Promise<Producer | null> {
    return this.ormRepo.findOne({ where: { document } });
  }

  async update(producer: Producer): Promise<Producer> {
    return this.ormRepo.save(producer);
  }

  async remove(producer: Producer): Promise<void> {
    await this.ormRepo.remove(producer);
  }
}
