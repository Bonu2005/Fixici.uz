import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderFilter } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GuardGuard } from 'src/guard/guard.guard';
import { Request } from 'express';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { orderStatus, paymentType } from "generated/prisma";
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorators/role.guard';

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
  @UseGuards(RoleGuard)
  @Role("ADMIN","VIEWER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: orderStatus })
  @ApiQuery({ name: 'payment_type', required: false, enum: paymentType })
  // @ApiQuery({ name: 'paid', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'with_delivery', required: false, enum: ['true', 'false'] })
  @ApiQuery({ name: 'lteTotal', required: false, type: String })
  @ApiQuery({ name: 'gteTotal', required: false, type: String })
  @ApiQuery({ name: 'total', required: false, type: String })
  @ApiQuery({ name: 'lteDate', required: false, type: String })
  @ApiQuery({ name: 'gteDate', required: false, type: String })
  @ApiQuery({ name: 'date', required: false, type: String })
  findAll(@Query() filter:OrderFilter) {
    let page= Number(filter.page)||1
    let limit = Number(filter.limit)||10
    let search = filter.search||""
    let date = filter.date
    let total =Number( filter.total)
    let status:orderStatus = filter.status
    let with_delivery = filter.withDelivery
    let payment_type:paymentType = filter.paymentType
    let gteTotal = Number(filter.gteTotal)
    let lteTotal = Number(filter.lteTotal)
    let gteDate = filter.gteDate
    let lteDate = filter.lteDate
    return this.orderService.findAll(page,limit,search,date,total,status,payment_type,gteTotal,lteTotal,gteDate,lteDate,with_delivery);
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","VIEWER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
