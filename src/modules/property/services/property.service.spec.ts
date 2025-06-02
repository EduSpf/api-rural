import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PropertyRepository } from '../repositories/property.repository';
import { ProducerRepository } from '../../producer/repository/producer.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Property } from '../entities/property.entity';

describe('PropertyService', () => {
    let service: PropertyService;
    let propertyRepo: jest.Mocked<PropertyRepository>;
    let producerRepo: jest.Mocked<ProducerRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PropertyService,
                {
                    provide: PropertyRepository,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findById: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: ProducerRepository,
                    useValue: {
                        findById: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<PropertyService>(PropertyService);
        propertyRepo = module.get(PropertyRepository);
        producerRepo = module.get(ProducerRepository);
    });
    const createFakeProducer = () => ({
        id: 'produtor-id',
        name: 'Produtor Mock',
        document: '12345678901',
        properties: [],
    });

    const dto: CreatePropertyDto = {
        name: 'Fazenda Teste',
        city: 'Cidade X',
        state: 'UF',
        area_total: 100,
        area_agriculture: 60,
        area_vegetation: 30,
        producerId: '58095445-d43d-4909-a0d9-c5795d006004',
        customValidation: true,
    };

    it('deve criar uma propriedade com sucesso', async () => {
        const fakeProducer = { id: dto.producerId, name: 'Produtor' };
        const fakeProperty: Property = {
            id: 'property-id',
            name: 'Fazenda Modelo',
            city: 'Cidade X',
            state: 'UF',
            area_total: 100,
            area_agriculture: 60,
            area_vegetation: 40,
            producer: {
                id: 'producer-id',
                name: 'Produtor Teste',
                document: '12345678901',
                properties: [],
            },
            harvests: [],
        };

        producerRepo.findById.mockResolvedValue({
            id: 'produtor-id',
            name: 'Produtor Mock',
            document: '12345678901',
            properties: [],
        });
        propertyRepo.create.mockResolvedValue(fakeProperty);

        const result = await service.create(dto);
        expect(result).toEqual(fakeProperty);
    });

    it('deve lançar exceção se o produtor não existir', async () => {
        producerRepo.findById.mockResolvedValue(null);

        await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar exceção se área agrícola + vegetação > área total', async () => {
        const invalidDto = { ...dto, area_agriculture: 60, area_vegetation: 50 };
        producerRepo.findById.mockResolvedValue(createFakeProducer());

        await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
    });
});
