import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class BasketService {
  constructor(private prisma:PrismaService){}
 async create(createBasketDto: CreateBasketDto,req:Request) {
   try {
    let {id} = req["user"]
       let created = await this.prisma.basket.create({data:{...createBasketDto,userId:id}})
       return created
      } catch (error) {
       throw new InternalServerErrorException()
      }
  }

 async findAll() {
    try {
      let find = await this.prisma.basket.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

 async findOne(id: string) {
    try {
      let find = await this.prisma.basket.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

 async update(id: string, updateBasketDto: UpdateBasketDto) {
    try {
      let find = await this.prisma.basket.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.basket.update({where:{id},data:updateBasketDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

 async remove(id: string) {
    try {
      let find = await this.prisma.basket.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.basket.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
