import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma:PrismaService){}
 async create(createRegionDto: CreateRegionDto) {
   try {
    let created = await this.prisma.region.create({data:createRegionDto})
    return created
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }
  async findAll() {
    try {
      let find = await this.prisma.region.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.region.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
   }

 async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let find = await this.prisma.region.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.region.update({where:{id},data:updateRegionDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

  async  remove(id: string) {
    try {
      let find = await this.prisma.region.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.region.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
