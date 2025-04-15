import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma:PrismaService){}
 async create(createToolDto: CreateToolDto) {
   try {
    let {sizeId,capacityId,brandId} = createToolDto
    let findSize = await this.prisma.size.findFirst({where:{id:sizeId}})
    let findCapacity = await this.prisma.capacity.findFirst({where:{id:capacityId}})
    let findBrand = await this.prisma.brand.findFirst({where:{id:brandId}})
    if(!findSize || !findCapacity || !findBrand){
      return {message:"Wrong id pleace recheeck seziId ,capacityId or brandId"}
    }
    let created = await this.prisma.tools.create({data:{...createToolDto,isActive:true}})
    return created
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }
  async findAll() {
    try {
      let find = await this.prisma.tools.findMany()
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
  async findOne(id: string) {
    try {
      let find = await this.prisma.tools.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
   }

 async update(id: string, updateToolDto: UpdateToolDto) {
    try {
      let find = await this.prisma.tools.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.tools.update({where:{id},data:updateToolDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }


  async  remove(id: string) {
    try {
      let find = await this.prisma.tools.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.tools.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
