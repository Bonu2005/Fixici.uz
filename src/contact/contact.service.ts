import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma:PrismaService){}
 async create(createContactDto: CreateContactDto) {
   try {
    let created = await this.prisma.contact.create({data:createContactDto})
    return created
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

  async findAll() {
    try {
      let find = await this.prisma.contact.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
  async findOne(id: string) {
    try {
      let find = await this.prisma.contact.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
   }
 async update(id: string, updateContactDto: UpdateContactDto) {
    try {
      let find = await this.prisma.contact.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.contact.update({where:{id},data:updateContactDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

  async  remove(id: string) {
    try {
      let find = await this.prisma.contact.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.contact.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
