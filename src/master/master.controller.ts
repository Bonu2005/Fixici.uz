import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto, MasterFilterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { ApiOperation, ApiBody, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/guard/role.guard';
import { GuardGuard } from 'src/guard/guard.guard';
import { Role } from 'src/decorators/role.guard';

@ApiTags('Master')
@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
   @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new master' })
  @ApiBody({type:CreateMasterDto})
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Role("ADMIN","VIEWER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all masters' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'orderBy', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: '' })
  @ApiQuery({ name: 'maxYear', required: false, type: Number, example:""  })
  @ApiQuery({ name: 'minYear', required: false, type: Number, example: "" })
  @ApiQuery({ name: 'year', required: false, type: Number, example: "" })
  @ApiQuery({ name: 'fullName', required: false, type: String, example: "" })
  @ApiQuery({ name: 'isActive', required: false, enum: ['true', 'false'] })
  findAll(@Query() filter:MasterFilterDto) {
    let page = Number(filter.page)||1
    let limit= Number(filter.limit)||10
    let search =filter.search||""
    let minYear =Number(filter.minYear)
    let maxYear =Number(filter.maxYear)
    let year =Number(filter.year)
    let fullName = filter.fullName
    return this.masterService.findAll(page,limit,search,minYear,maxYear,year,fullName,filter.isActive);
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","VIEWER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get master by ID' })
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
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
        star: { type: 'number', example: 5 },
        about: { type: 'string', example: 'Updated description of technician.' },
      },
      required: [],
    },
  })
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(id, updateMasterDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a master by ID' })
  remove(@Param('id') id: string) {
    return this.masterService.remove(id);
  }
}
