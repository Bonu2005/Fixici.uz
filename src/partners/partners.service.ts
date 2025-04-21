import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private prisma:PrismaService){}
async create(createPartnerDto: CreatePartnerDto) {
   try {
    let created = await this.prisma.partners.create({data:createPartnerDto})
    return created
   } catch (error) {
    throw new BadRequestException(error)
   }
  }


  async findAll(page:number,limit:number,search:string) {
    try {
      let skip = (page-1)*limit
      let find = await this.prisma.partners.findMany({where:{OR:[{
        nameUz:{startsWith:search,mode:"insensitive"},
        nameRU:{startsWith:search,mode:"insensitive"},
        nameEng:{startsWith:search,mode:"insensitive"},
      }]},
    skip,take:limit})
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.partners.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new BadRequestException(error)
    }
   }
 async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      let find = await this.prisma.partners.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.partners.update({where:{id},data:updatePartnerDto})
      return updated
    } catch (error) {
     throw new BadRequestException(error)
    }
  }
  async  remove(id: string) {
    try {
      let find = await this.prisma.partners.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.partners.delete({where:{id}})
      return updated
    } catch (error) {
     throw new BadRequestException(error)
    }
  }
}
