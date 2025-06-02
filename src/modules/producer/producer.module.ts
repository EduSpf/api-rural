import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { ProducerService } from './services/producer.service';
import { ProducerController } from './controllers/producer.controller';
import { ProducerRepository } from './repository/producer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  providers: [ProducerService, ProducerRepository],
  controllers: [ProducerController],
  exports: [ProducerRepository]
})
export class ProducerModule {}
