import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CropService } from '../services/crop.service';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Crops')
@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  create(@Body() dto: CreateCropDto) {
    return this.cropService.create(dto);
  }

  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCropDto) {
    return this.cropService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropService.remove(id);
  }
}
