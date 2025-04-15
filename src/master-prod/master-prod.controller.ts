import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterProdService } from './master-prod.service';
import { CreateMasterProdDto } from './dto/create-master-prod.dto';
import { UpdateMasterProdDto } from './dto/update-master-prod.dto';

@Controller('master-prod')
export class MasterProdController {
  constructor(private readonly masterProdService: MasterProdService) {}

  @Post()
  create(@Body() createMasterProdDto: CreateMasterProdDto) {
    return this.masterProdService.create(createMasterProdDto);
  }

  @Get()
  findAll() {
    return this.masterProdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterProdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterProdDto: UpdateMasterProdDto) {
    return this.masterProdService.update(+id, updateMasterProdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProdService.remove(+id);
  }
}
