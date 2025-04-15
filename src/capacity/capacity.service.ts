import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CapacityService {
  constructor(private prisma:PrismaService){}
 async create(createCapacityDto: CreateCapacityDto) {
   try {
    let created = await this.prisma.capacity.create({data:createCapacityDto})
    return created
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async findAll() {
    try {
      let find = await this.prisma.capacity.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
   try {
     let find = await this.prisma.capacity.findUnique({where:{id}})
     if(!find){
      return {message:"No data found with this id"}
     }
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async update(id: string, updateCapacityDto: UpdateCapacityDto) {
    try {
      let find = await this.prisma.capacity.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.capacity.update({where:{id},data:updateCapacityDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

async  remove(id: string) {
    try {
      let find = await this.prisma.capacity.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.capacity.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
