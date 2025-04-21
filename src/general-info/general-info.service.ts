import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeneralInfoService {
  constructor(private prisma:PrismaService){}
  async create(createGeneralInfoDto: CreateGeneralInfoDto) {
    try {
     let created = await this.prisma.generalInfo.create({data:createGeneralInfoDto})
     return created
    } catch (error) {
     throw new BadRequestException(error)
    }
   }

   async findAll() {
    try {
      let find = await this.prisma.generalInfo.findMany()
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.generalInfo.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new BadRequestException(error)
    }
   }

 async update(id: string, updateGeneralInfoDto: UpdateGeneralInfoDto) {
    try {
      let find = await this.prisma.generalInfo.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.generalInfo.update({where:{id},data:updateGeneralInfoDto})
      return updated
    } catch (error) {
     throw new BadRequestException(error)
    }
  }

  async  remove(id: string) {
    try {
      let find = await this.prisma.generalInfo.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.generalInfo.delete({where:{id}})
      return updated
    } catch (error) {
     throw new BadRequestException(error)
    }
  }
}
