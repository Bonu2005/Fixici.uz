import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({type:CreateBrandDto})
  create(@Body() createBrandDto: CreateBrandDto,) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: '' })
  @ApiResponse({ status: 200, description: 'List of brands returned successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Query() query:{page?:number,limit?:number,search?:string}) {
    const page = Number(query.page)||1
    const limit = Number(query.limit)|| 10
    const search = query.search||""
    return this.brandService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by ID' })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update brand by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Обновленная марка' },
        nameRU: { type: 'string', example: 'Обновленная марка' },
        nameEng: { type: 'string', example: 'Updated Brand' },
      },
      required: [] // Все поля опциональны для обновления
    }
  })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete brand by ID' })
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
