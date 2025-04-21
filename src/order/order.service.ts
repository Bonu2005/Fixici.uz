import { BadRequestException, Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderProductDto, OrderFilter } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { orderStatus, paymentType } from 'generated/prisma';
import { TelegrafService } from 'src/telegraf/telegraf.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService,private telegrafService:TelegrafService) { }
  async create(createOrderDto: CreateOrderDto, req: Request) {

    try {
      let { id } = req["user"]
      let findUser= await this.prisma.user.findUnique({where:{id}})
      let { orderProduct, ...body } = createOrderDto
      let [{ toolId, levelId, productId }] = orderProduct
      let toolFind = await this.prisma.tools.findUnique({ where: { id: toolId } })
      let levelFind = await this.prisma.level.findUnique({ where: { id: levelId } })
      let productFind = await this.prisma.product.findUnique({ where: { id: productId } })
      console.log(toolFind, levelFind, productFind);

      if (!toolFind || !levelFind || !productFind) {
        return { message: "No data  Pleace recheack toolId , levelId or productId" }
      }
      let created = await this.prisma.order.create({ data: { ...body, status: "PENDING", userId: id, OrderProducts: { create: orderProduct } } })
      this.telegrafService.sendNotifecation(`orderFrom:${findUser?.fullName},address:${created.address},withDelivery:${created.withDelivery}`)
      
      await this.prisma.basket.deleteMany({ where: { userId: id } })
      return created
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error)
    }
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
    date: Date,
    total: number,
    status: orderStatus,
    payment_type: paymentType,
    gteTotal: number,
    lteTotal: number,
    gteDate: string,
    lteDate: string,
    with_delivery: boolean
  ) {
    try {
      const skip = (page - 1) * limit;
      let fltr: any = {};
  
      // Поиск по дате
      if (date) {
        fltr.date = date;
      }
  
      // Точная сумма
      if (total) {
        fltr.total = total;
      }
  
      // Диапазон суммы
      if (gteTotal || lteTotal) {
        fltr.total = {};
        if (gteTotal) {
          fltr.total.gte = gteTotal;
        }
        if (lteTotal) {
          fltr.total.lte = lteTotal;
        }
      }
  
      // Диапазон по дате
      if (gteDate || lteDate) {
        fltr.date = {};
        if (gteDate) {
          fltr.date.gte = new Date(gteDate);
        }
        if (lteDate) {
          fltr.date.lte = new Date(lteDate);
        }
      }
  
      // Поиск по статусу
      if (status) {
        fltr.status = status;
      }
  
      // Поиск по типу оплаты
      if (payment_type) {
        fltr.payment_type = payment_type;
      }
  
      // Поиск по флагу доставки
      if (typeof with_delivery === 'boolean') {
        fltr.with_delivery = with_delivery;
      }
  
      // Поиск по имени или id (как пример)
      if (search) {
        fltr.OR = [
          { customerName: { contains: search, mode: 'insensitive' } },
          { id: { contains: search } }
        ];
      }
  
      const find = await this.prisma.order.findMany({
        where: fltr,
        skip,
        take: limit,
      });
  
      return find;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
  
  async findOne(id: string) {
    try {
      let find = await this.prisma.order.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let { status, master } = updateOrderDto
      if (!master) {
        return await this.prisma.order.update({ where: { id }, data: { status } })
      }

      let find = await this.prisma.order.findUnique({ where: { id } })

      if (!find) {
        return { message: "No data found with this id" }
      }
     
      const foundMasters = await this.prisma.master.findMany({
        where: {
          id: { in: master.map((m) => m.masterId) },
        },
      });

      if (foundMasters.length !== master.length) {
        return {
          message: 'One or more master IDs do not exist.',
          found: foundMasters.map((m) => m.id),
        };
      }
      let updated = await this.prisma.order.update({ where: { id }, data: { status, OrderMasters: { create: master.map((mast) => ({ master: { connect: { id: mast.masterId } } })) } } })
      return updated
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.order.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.order.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
