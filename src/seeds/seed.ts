import { DataSource } from 'typeorm';
import { Producer } from '../modules/producer/entities/producer.entity';
import { Property } from '../modules/property/entities/property.entity';
import { Harvest } from '../modules/harvest/entities/harvest.entity';
import { Crop } from '../modules/crop/entities/crop.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ruraldb',
  synchronize: true,
  entities: [Producer, Property, Harvest, Crop],
});

AppDataSource.initialize().then(async () => {
  const producerRepo = AppDataSource.getRepository(Producer);
  const propertyRepo = AppDataSource.getRepository(Property);
  const harvestRepo = AppDataSource.getRepository(Harvest);
  const cropRepo = AppDataSource.getRepository(Crop);

  const prod1 = producerRepo.create({
    name: 'João Silva',
    document: '12345678901',
  });
  await producerRepo.save(prod1);

  const fazenda = propertyRepo.create({
    name: 'Fazenda Boa Esperança',
    city: 'Uberlândia',
    state: 'MG',
    area_total: 100,
    area_agriculture: 60,
    area_vegetation: 40,
    producer: prod1,
  });
  await propertyRepo.save(fazenda);

  const safra = harvestRepo.create({
    year: 2022,
    property: fazenda,
  });
  await harvestRepo.save(safra);

  const culturas = ['Soja', 'Milho'];
  for (const nome of culturas) {
    const crop = cropRepo.create({
      name: nome,
      harvest: safra,
    });
    await cropRepo.save(crop);
  }

  console.log('Seeds inseridas com sucesso');
  process.exit(0);
});
