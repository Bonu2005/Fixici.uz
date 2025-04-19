import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderProductDto, OrderFilter } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }
  async create(createOrderDto: CreateOrderDto, req: Request) {

    try {
      let { id } = req["user"]
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
      console.log(1);

      await this.prisma.basket.deleteMany({ where: { userId: id } })
      return created
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException()
    }
  }

  async findAll(page: number, limit: number, filter: OrderFilter) {
    try {

      let skip = (page - 1) * limit

      let find = await this.prisma.order.findMany()
      return find
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.order.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
    } catch (error) {
      throw new InternalServerErrorException()
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

      throw new InternalServerErrorException()
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
      throw new InternalServerErrorException()
    }
  }
}
