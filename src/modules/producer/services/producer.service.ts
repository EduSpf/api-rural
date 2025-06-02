import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { Producer } from '../entities/producer.entity';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { DocumentValidator } from '../../../common/validators/document.validator';
import { ProducerRepository } from '../repository/producer.repository';

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    if (!DocumentValidator.isValid(dto.document)) {
      throw new BadRequestException('Documento inválido');
    }

    const exists = await this.producerRepository.findByDocument(dto.document);
    if (exists) throw new BadRequestException('Documento já cadastrado');

    return this.producerRepository.create(dto);
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepository.findAll();
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findById(id);
    if (!producer) throw new NotFoundException('Produtor não encontrado');
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    const producer = await this.findOne(id);
    Object.assign(producer, dto);
    return this.producerRepository.update(producer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);
    await this.producerRepository.remove(producer);
  }
}
