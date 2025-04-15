import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private prisma:PrismaService){}
 async create(createFaqDto: CreateFaqDto) {
 try {
     let created = await this.prisma.fAQ.create({data:createFaqDto})
     return created
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      let find = await this.prisma.fAQ.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.fAQ.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
   }

  async update(id: string, updatefaqDto: UpdateFaqDto) {
     try {
       let find = await this.prisma.fAQ.findUnique({where:{id}})
       if(!find){
        return {message:"No data found with this id"}
       }
       let updated = await this.prisma.fAQ.update({where:{id},data:updatefaqDto})
       return updated
     } catch (error) {
      throw new InternalServerErrorException()
     }
   }

   async  remove(id: string) {
    try {
      let find = await this.prisma.fAQ.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.fAQ.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
