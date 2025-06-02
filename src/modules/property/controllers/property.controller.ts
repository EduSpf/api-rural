import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PropertyService } from '../services/property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
