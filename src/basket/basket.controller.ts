import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GuardGuard } from 'src/guard/guard.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorators/role.guard';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @UseGuards(GuardGuard)
  @ApiOperation({ summary: 'Create a basket item' })
  @ApiBody({type:CreateBasketDto})
  @ApiBearerAuth('access-token')
  create(@Body() createBasketDto: any,@Req() req:Request){
    return this.basketService.create(createBasketDto,req);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all basket items' })
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get basket item by ID' })
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
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
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
   @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete basket item by ID' })
  remove(@Param('id') id: string) {
    return this.basketService.remove(id);
  }
}
