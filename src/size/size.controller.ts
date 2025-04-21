import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorators/role.guard';
import { GuardGuard } from 'src/guard/guard.guard';

@ApiTags('Sizes')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) { }

  @Post()
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new size' })
  @ApiBody({type:CreateSizeDto})
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all size with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: '' })
  @ApiResponse({ status: 200, description: 'List of size returned successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Query() query: { page: string, limit: string, search: string }) {
    let page = Number(query.page) || 1
    let limit = Number(query.limit) || 10
    let search = query.search || ""
    return this.sizeService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get size by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Size ID' })
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update size by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Updated Size' },
        nameRU: { type: 'string', example: 'Обновлённый размер' },
        nameEng: { type: 'string', example: 'Updated Size' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete size by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Size ID' })
  remove(@Param('id') id: string) {
    return this.sizeService.remove(id);
  }
}
