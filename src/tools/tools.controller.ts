import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto, ToolFilterDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { userRole, userStatus } from 'generated/prisma';

@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tool' })
  @ApiBody({type:CreateToolDto})
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  @Get()
@ApiOperation({ summary: 'Get all masters' })
@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
@ApiQuery({ name: 'search', required: false, type: String, example: 'John' })
@ApiQuery({ name: 'price', required: false, type: Number, example: 2023 })
@ApiQuery({ name: 'capacityId', required: false, type: String, example: "" })
@ApiQuery({ name: 'sizeId', required: false, type: String, example: "" })
@ApiQuery({ name: 'brandId', required: false, type: String, example: "" })
  findAll(@Query() query:{page:string,limit:string,search:string}) {
    let page = Number(query.page)||1
    let limit = Number(query.limit)||10
    let search = query.search||""
    
    return this.toolsService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tool by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Tool ID' })
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update tool by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Обновлённая дрель' },
        nameRU: { type: 'string', example: 'Обновлённая дрель' },
        nameEng: { type: 'string', example: 'Updated Drill' },
        descriptionUz: { type: 'string', example: 'Обновлённое описание' },
        descriptionRU: { type: 'string', example: 'Обновлённое описание' },
        descriptionEng: { type: 'string', example: 'Updated description' },
        price: { type: 'number', example: 1600 },
        quantity: { type: 'number', example: 120 },
        code: { type: 'number', example: 123457 },
        image: { type: 'string', example: 'https://example.com/updated-tool-image.jpg' },
        brandId: { type: 'string', example: 'brand-id-123' },
        isActive: { type: 'boolean', example: true },
        capacityId: { type: 'string', example: 'capacity-id-456' },
        sizeId: { type: 'string', example: 'size-id-789' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tool by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Tool ID' })
  remove(@Param('id') id: string) {
    return this.toolsService.remove(id);
  }
}
