import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

describe('PropertyController Update (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let dataSource: DataSource;
  let producerId: string;
  let propertyId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();

    dataSource = moduleFixture.get(DataSource);

    // Cria produtor
    const prodRes = await request(httpServer)
      .post('/producers')
      .send({ name: 'Produtor Update', document: '98765432100' });
    producerId = prodRes.body.id;

    // Cria propriedade válida
    const propRes = await request(httpServer)
      .post('/properties')
      .send({
        name: 'Propriedade Original',
        city: 'Origem',
        state: 'SP',
        area_total: 100,
        area_agriculture: 40,
        area_vegetation: 40,
        producerId,
      });
    propertyId = propRes.body.id;
  });

  it('Deve lançar 400 ao tentar atualizar com soma de áreas inválida', async () => {
    const dto = {
      name: 'Atualizada Inválida',
      city: 'Cidade',
      state: 'SP',
      area_total: 100,
      area_agriculture: 60,
      area_vegetation: 50,
    };

    const res = await request(httpServer)
      .put(`/properties/${propertyId}`)
      .send(dto);

    expect(res.status).toBe(400);
    expect(res.body.message).toContain(
      'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
    );
  });

  it('Deve atualizar com sucesso se as áreas forem válidas', async () => {
    const dto = {
      name: 'Propriedade Atualizada',
      city: 'Atualizada',
      state: 'GO',
      area_total: 100,
      area_agriculture: 50,
      area_vegetation: 40,
    };

    const res = await request(httpServer)
      .put(`/properties/${propertyId}`)
      .send(dto);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Propriedade Atualizada');
    expect(res.body.area_agriculture).toBe(50);
  });
  
});
