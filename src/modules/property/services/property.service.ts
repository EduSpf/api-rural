import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from '../repositories/property.repository';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';
import { ProducerRepository } from '../../producer/repository/producer.repository';



@Injectable()
export class PropertyService {
  constructor(
    private readonly propertyRepo: PropertyRepository,
    private readonly producerRepo: ProducerRepository,
  ) {}

  async create(dto: CreatePropertyDto): Promise<Property> {
    const producer = await this.producerRepo.findById(dto.producerId);
    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    const { area_total, area_agriculture, area_vegetation } = dto;
    if (area_agriculture + area_vegetation > area_total) {
      throw new BadRequestException(
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
      );
    }

    return this.propertyRepo.create({
      ...dto,
      producer,
    });
  }

  async findAll(): Promise<Property[]> {
    return this.propertyRepo.findAll();
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepo.findById(id);
    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }
    return property;
  }

  async update(id: string, dto: UpdatePropertyDto): Promise<Property> {
    const property = await this.findOne(id);
    Object.assign(property, dto);
    return this.propertyRepo.create(property);
  }

  async remove(id: string): Promise<void> {
    const property = await this.findOne(id);
    await this.propertyRepo.delete(property.id);
  }
}
