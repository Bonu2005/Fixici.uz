import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorators/role.guard';
import { GuardGuard } from 'src/guard/guard.guard';

@ApiTags('Capacity')
@Controller('capacity')
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
   @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new capacity' })
  @ApiBody({type:CreateCapacityDto})
  create(@Body() createCapacityDto: CreateCapacityDto) {
    return this.capacityService.create(createCapacityDto);
  }

  @Get()
   @ApiOperation({ summary: 'Get all capacities with pagination and search' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String, example: '' })
    @ApiResponse({ status: 200, description: 'List of capacities returned successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    findAll(@Query() query:{page:string,limit:string,search:string}) {
    let page = Number(query.page)||1
    let limit= Number(query.limit)||10
    let search = query.search||""
    return this.capacityService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get capacity by ID' })
  findOne(@Param('id') id: string) {
    return this.capacityService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update capacity by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Обновленная мощность' },
        nameRU: { type: 'string', example: 'Обновленная мощность' },
        nameEng: { type: 'string', example: 'Updated Capacity' },
      },
      required: []
    }
  })
  update(@Param('id') id: string, @Body() updateCapacityDto: UpdateCapacityDto) {
    return this.capacityService.update(id, updateCapacityDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete capacity by ID' })
  remove(@Param('id') id: string) {
    return this.capacityService.remove(id);
  }
}
