import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    throw new BadRequestException(error)
   }
  }

  async findAll(page:number,limit:number,search:string) {
    try {
      let skip =(page-1)*limit
      let find = await this.prisma.brand.findMany({where:{OR:[
        {nameUz:{startsWith:search,mode:"insensitive"}},
        {nameRU:{startsWith:search,mode:"insensitive"}},
        {nameEng:{startsWith:search,mode:"insensitive"}}
      ]      
      },
    skip,
    take:limit})
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.brand.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new BadRequestException(error)
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
     throw new BadRequestException(error)
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
     throw new BadRequestException(error)
    }
  }
}
