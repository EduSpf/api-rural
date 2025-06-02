import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProducerService } from '../services/producer.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Producers')
@Controller('producers')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Post()
  create(@Body() dto: CreateProducerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProducerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
