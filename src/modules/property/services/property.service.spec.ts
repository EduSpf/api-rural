import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Producer } from '../../producer/entities/producer.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PropertyService', () => {
    let service: PropertyService;
    let repo: Repository<Property>;
    let producerRepo: Repository<Producer>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PropertyService,
                {
                    provide: getRepositoryToken(Property),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Producer),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<PropertyService>(PropertyService);
        repo = module.get<Repository<Property>>(getRepositoryToken(Property));
        producerRepo = module.get<Repository<Producer>>(getRepositoryToken(Producer));
    });

    it('deve lançar erro se o produtor não existir', async () => {
        jest.spyOn(producerRepo, 'findOneBy').mockResolvedValue(null);
        await expect(
            service.create({
                name: 'Fazenda Teste',
                city: 'Cidade',
                state: 'SP',
                area_total: 100,
                area_agriculture: 60,
                area_vegetation: 50,
                producerId: 'id-invalido',
                customValidation: false
            }),
        ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar erro se soma das áreas for maior que total', async () => {
        jest.spyOn(producerRepo, 'findOneBy').mockResolvedValue({ id: 'valid-id' } as Producer);
        await expect(
            service.create({
                name: 'Fazenda Teste',
                city: 'Cidade',
                state: 'SP',
                area_total: 100,
                area_agriculture: 80,
                area_vegetation: 30,
                producerId: 'valid-id',
                customValidation: false
            }),
        ).rejects.toThrow(BadRequestException);
    });

    it('deve criar propriedade se áreas forem válidas', async () => {
        const dto = {
            name: 'Fazenda OK',
            city: 'Cidade OK',
            state: 'MG',
            area_total: 100,
            area_agriculture: 40,
            area_vegetation: 50,
            producerId: 'valid-id',
            customValidation: false
        };

        const mockProperty: Property = {
            ...dto,
            id: 'uuid',
            producer: { id: 'valid-id', name: 'João', document: '123' } as Producer,
            harvests: [],
        };


        jest.spyOn(producerRepo, 'findOneBy').mockResolvedValue({ id: 'valid-id' } as Producer);
        jest.spyOn(repo, 'create').mockReturnValue(mockProperty);
        jest.spyOn(repo, 'save').mockResolvedValue(mockProperty);

        const result = await service.create(dto);
        expect(result).toEqual(mockProperty);
    });
});