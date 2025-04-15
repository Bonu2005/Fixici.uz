import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma:PrismaService){}
 async create(createBrandDto: CreateBrandDto) {
   try {
    let created = await this.prisma.brand.create({data:createBrandDto})
    return created
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

  async findAll() {
    try {
      let find = await this.prisma.brand.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.brand.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
   }

 async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      let find = await this.prisma.brand.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.brand.update({where:{id},data:updateBrandDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

  async  remove(id: string) {
    try {
      let find = await this.prisma.brand.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.brand.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
