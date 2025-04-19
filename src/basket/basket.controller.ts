import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateBasketDto } from './dto/create-basket.dto';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @ApiOperation({ summary: 'Create a basket item' })
  @ApiBody({type:CreateBasketDto})
  create(@Body() createBasketDto: any,@Req() req:Request){
    return this.basketService.create(createBasketDto,req);
  }

  @Get()
  @ApiOperation({ summary: 'Get all basket items' })
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get basket item by ID' })
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update basket item by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'string', example: 'prod-12345' },
        productCount: { type: 'number', example: 5 },
        quantity: { type: 'number', example: 20 },
        measure: { type: 'number', example: 2 },
        toolId: { type: 'string', example: 'tool-98765' },
        timeUnit: {
          type: 'string',
          enum: ['DAILY', 'HOURSLY'],   
          example: 'WEEKLY'
        }
      },

      required: []
    }
  })
  update(@Param('id') id: string, @Body() updateBasketDto: any) {
    return this.basketService.update(id, updateBasketDto);
  }
  

  @Delete(':id')
  @ApiOperation({ summary: 'Delete basket item by ID' })
  remove(@Param('id') id: string) {
    return this.basketService.remove(id);
  }
}
