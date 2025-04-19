import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderFilter } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GuardGuard } from 'src/guard/guard.guard';
import { Request } from 'express';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { orderStatus, paymentType } from "generated/prisma";

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  

  @Post()
  @UseGuards(GuardGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiBody({ type: CreateOrderDto })
    create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
      return this.orderService.create(createOrderDto, req);
    }
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll(@Query() query:{page:string,limit:string,filter:OrderFilter}) {
    let page= Number(query.page)||1
    let limit = Number(query.limit)||10
    let filter = query.filter||undefined  
    return this.orderService.findAll(page,limit,filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
