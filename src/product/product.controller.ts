import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiBody({type:CreateProductDto})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(@Query() query:{page:string,limit:string,search:string,}) {
    let page = Number(query.page)||1
    let limit = Number(query.limit)||10
    let search = query.search||""
    return this.productService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Машина Обновлено' },
        nameRU: { type: 'string', example: 'Машина Обновлено' },
        nameEng: { type: 'string', example: 'Machine Updated' },
        image: { type: 'string', example: 'https://example.com/updated_image.jpg' },
        minWorkingHours: { type: 'number', example: 3 },
        levelId: { type: 'string', example: '123' },
        priceHourly: { type: 'number', example: 150 },
        priceDaily: { type: 'number', example: 900 },
        toolId: { type: 'string', example: '456' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
