import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto, MasterFilterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { ApiOperation, ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Master')
@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new master' })
  @ApiBody({type:CreateMasterDto})
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all masters' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'John' })
  @ApiQuery({ name: 'year', required: false, type: Number, example: 2023 })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
  findAll(@Query() query:{page:string,limit:string,search:string,filter:MasterFilterDto}) {
    let page = Number(query.page)||1
    let limit = Number(query.limit)||10
    let search = query.search||""
    let filter = query.filter||undefined
    return this.masterService.findAll(page,limit,search,filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get master by ID' })
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a master by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'Updated John Doe' },
        phone: { type: 'string', example: '+998901234567' },
        isActive: { type: 'boolean', example: true },
        year: { type: 'number', example: 2023 },
        image: { type: 'string', example: 'url_to_updated_image' },
        passportImage: { type: 'string', example: 'url_to_updated_passport_image' },
        star: { type: 'string', example: '⭐⭐⭐⭐⭐' },
        about: { type: 'string', example: 'Updated description of technician.' },
      },
      required: [],
    },
  })
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(id, updateMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a master by ID' })
  remove(@Param('id') id: string) {
    return this.masterService.remove(id);
  }
}
