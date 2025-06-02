import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { DataSource } from 'typeorm';
import { AppModule } from '../../src/app.module';


describe('PropertyController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let dataSource: DataSource;
  let producerId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();

    dataSource = moduleFixture.get(DataSource);
    const res = await request(httpServer)
      .post('/producers')
      .send({ name: 'Teste Produtor', document: '12345678901' });

    producerId = res.body.id;
  });

  it('Deve retornar 400 se a soma das áreas for maior que a área total', async () => {
    const dto = {
      name: 'Fazenda Teste',
      city: 'Cidade Teste',
      state: 'SP',
      area_total: 100,
      area_agriculture: 60,
      area_vegetation: 50,
      producerId,
    };

    const response = await request(httpServer)
      .post('/properties')
      .send(dto);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
    );
  });

  it('Deve criar propriedade se as áreas forem válidas', async () => {
    const dto = {
      name: 'Fazenda Válida',
      city: 'Cidade Válida',
      state: 'GO',
      area_total: 100,
      area_agriculture: 40,
      area_vegetation: 50,
      producerId,
    };

    const response = await request(httpServer)
      .post('/properties')
      .send(dto);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Fazenda Válida');
  });

});
