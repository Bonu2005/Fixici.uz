import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMasterDto, MasterFilterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterService {
  constructor(private prisma:PrismaService){}
async  create(createMasterDto: CreateMasterDto) {
  let {masterProducts,...data} = createMasterDto
  let lvl =masterProducts.map((s)=>s.levelId)
  lvl = Array.from(new Set(lvl))
  let prod = masterProducts.map((s)=>s.productId)
  prod = Array.from(new Set(prod))
  try {

     let lvlCount = await this.prisma.level.count({where:{id:{in:lvl}}})
     let prodCount = await this.prisma.product.count({where:{id:{in:prod}}})
     if(lvlCount!==lvl.length || prodCount!==prod.length){
     return {message:'Some level or product id does not exists'}
     }
     let created = await this.prisma.master.create({data:{...createMasterDto,isActive:true,MasterProd:{create:masterProducts.map((m)=>({productId:m.productId,priceDaily:m.priceDaily,priceHourly:m.priceHourly,experience:m.experience,levelId:m.levelId,minWorkingHour:m.minWorkingHour}))}}})
     return created
    } catch (error) {
      console.log(error);
      
     throw new InternalServerErrorException()
    }
  }

 async findAll(page:number,limit:number,search:string,filter:MasterFilterDto) {
    try {
      let skip = (page-1)*limit
      let find = await this.prisma.master.findMany({where:{
        OR:[
         { fullName:{startsWith:search,mode:"insensitive"}},
         { phone:{startsWith:search,mode:"insensitive"}},
         { about:{startsWith:search,mode:"insensitive"}}
        ],
 
      },
    skip,take:limit})
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

 async findOne(id: string) {
    try {
      let find = await this.prisma.master.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

 async update(id: string, updateMasterDto: UpdateMasterDto) {
    try {
      let find = await this.prisma.master.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.master.update({where:{id},data:updateMasterDto})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }

 async remove(id: string) {
    try {
      let find = await this.prisma.master.findUnique({where:{id}})
      if(!find){
       return {message:"No data found with this id"}
      }
      let updated = await this.prisma.master.delete({where:{id}})
      return updated
    } catch (error) {
     throw new InternalServerErrorException()
    }
  }
}
