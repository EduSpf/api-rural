import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { ProducerRepository } from '../repository/producer.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Producer } from '../entities/producer.entity';
import { DocumentValidator } from '../../../common/validators/document.validator';
jest.mock('../../../common/validators/document.validator');

describe('ProducerService', () => {
  let service: ProducerService;
  let repo: jest.Mocked<ProducerRepository>;

  const fakeProducer: Producer = {
    id: '1',
    name: 'João',
    document: '12345678901',
    properties: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: ProducerRepository,
          useValue: {
            findByDocument: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repo = module.get(ProducerRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('deve criar um produtor válido', async () => {
      (DocumentValidator.isValid as jest.Mock).mockReturnValue(true);
      repo.findByDocument.mockResolvedValue(null);
      repo.create.mockResolvedValue(fakeProducer);

      const dto = { name: 'João', document: '12345678901' };
      const result = await service.create(dto);

      expect(result).toEqual(fakeProducer);
      expect(repo.create).toHaveBeenCalledWith(dto);
    });

    it('deve lançar exceção se o documento for inválido', async () => {
      (DocumentValidator.isValid as jest.Mock).mockReturnValue(false);
      const dto = { name: 'João', document: 'invalido' };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar exceção se o documento já existir', async () => {
      (DocumentValidator.isValid as jest.Mock).mockReturnValue(true);
      repo.findByDocument.mockResolvedValue(fakeProducer);

      const dto = { name: 'João', document: '12345678901' };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtores', async () => {
      repo.findAll.mockResolvedValue([fakeProducer]);
      const result = await service.findAll();
      expect(result).toEqual([fakeProducer]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um produtor pelo ID', async () => {
      repo.findById.mockResolvedValue(fakeProducer);
      const result = await service.findOne('1');
      expect(result).toEqual(fakeProducer);
    });

    it('deve lançar exceção se o produtor não for encontrado', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar um produtor existente', async () => {
      repo.findById.mockResolvedValue(fakeProducer);
      repo.update.mockResolvedValue({ ...fakeProducer, name: 'Maria' });

      const result = await service.update('1', { name: 'Maria' });
      expect(result.name).toBe('Maria');
      expect(repo.update).toHaveBeenCalledWith({ ...fakeProducer, name: 'Maria' });
    });
  });

  describe('remove', () => {
    it('deve remover um produtor existente', async () => {
      repo.findById.mockResolvedValue(fakeProducer);
      await service.remove('1');
      expect(repo.remove).toHaveBeenCalledWith(fakeProducer);
    });
  });
});
