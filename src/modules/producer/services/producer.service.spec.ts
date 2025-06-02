import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from '../entities/producer.entity';
import { Repository } from 'typeorm';

describe('ProducerService', () => {
  let service: ProducerService;
  let repo: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repo = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

it('deve criar um produtor', async () => {
  const dto = { name: 'João', document: '12345678901' };
  const createdProducer = { ...dto } as Producer;
  const savedProducer = { ...createdProducer, id: 'uuid' } as Producer;

  jest.spyOn(repo, 'findOne').mockResolvedValue(null);
  jest.spyOn(repo, 'create').mockReturnValue(createdProducer);
  jest.spyOn(repo, 'save').mockResolvedValue(savedProducer);

  const result = await service.create(dto as Producer);
  expect(result).toEqual(savedProducer);
});
});
