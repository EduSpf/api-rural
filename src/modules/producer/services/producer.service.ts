import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
  ) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    if (!this.isValidDocument(dto.document)) {
      throw new BadRequestException('Documento inválido (CPF ou CNPJ)');
    }

    const exists = await this.repo.findOne({ where: { document: dto.document } });
    if (exists) throw new BadRequestException('Documento já cadastrado');

    const producer = this.repo.create(dto);
    return this.repo.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.repo.find({ relations: ['properties'] });
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.repo.findOne({ where: { id }, relations: ['properties'] });
    if (!producer) throw new NotFoundException('Produtor não encontrado');
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    const producer = await this.findOne(id);
    Object.assign(producer, dto);
    return this.repo.save(producer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);
    await this.repo.remove(producer);
  }

  private isValidDocument(document: string): boolean {
    const cleaned = document.replace(/\D/g, '');
    return cleaned.length === 11 || cleaned.length === 14;
  }
}
