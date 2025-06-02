import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HarvestService } from '../services/harvest.service';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Harvests')
@Controller('harvests')
export class HarvestController {
  constructor(private readonly service: HarvestService) {}

  @Post()
  create(@Body() dto: CreateHarvestDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateHarvestDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
