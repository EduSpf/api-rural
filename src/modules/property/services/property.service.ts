import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Producer } from '../../producer/entities/producer.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,

    @InjectRepository(Producer)
    private producerRepo: Repository<Producer>,
  ) {}

async create(dto: CreatePropertyDto) {
  const producer = await this.producerRepo.findOneBy({ id: dto.producerId });
  if (!producer) throw new NotFoundException('Produtor não encontrado');

  const { area_total, area_agriculture, area_vegetation } = dto;

  if (area_agriculture + area_vegetation > area_total) {
    throw new BadRequestException(
      'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
    );
  }

  const property = this.propertyRepo.create({
    ...dto,
    producer,
  });

  return this.propertyRepo.save(property);
}


  findAll() {
    return this.propertyRepo.find({
      relations: ['producer', 'harvests'],
    });
  }

  async findOne(id: string) {
    const prop = await this.propertyRepo.findOne({
      where: { id },
      relations: ['producer', 'harvests'],
    });
    if (!prop) throw new NotFoundException('Propriedade não encontrada');
    return prop;
  }

  async update(id: string, dto: UpdatePropertyDto) {
    const prop = await this.findOne(id);
    Object.assign(prop, dto);
    return this.propertyRepo.save(prop);
  }

  async remove(id: string) {
    const prop = await this.findOne(id);
    return this.propertyRepo.remove(prop);
  }
}
