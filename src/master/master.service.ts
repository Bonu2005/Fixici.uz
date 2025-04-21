import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMasterDto, MasterFilterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { equals } from 'class-validator';


@Injectable()
export class MasterService {
  constructor(private prisma: PrismaService) { }
  async create(createMasterDto: CreateMasterDto) {
    let { masterProducts, ...data } = createMasterDto
    let lvl = masterProducts.map((s) => s.levelId)
    lvl = Array.from(new Set(lvl))
    let prod = masterProducts.map((s) => s.productId)
    prod = Array.from(new Set(prod))
    try {

      let lvlCount = await this.prisma.level.count({ where: { id: { in: lvl } } })
      let prodCount = await this.prisma.product.count({ where: { id: { in: prod } } })
      if (lvlCount !== lvl.length || prodCount !== prod.length) {
        return { message: 'Some level or product id does not exists' }
      }
      let created = await this.prisma.master.create({ data: { ...data, isActive: true, MasterProd: { create: masterProducts.map((m) => ({ productId: m.productId, priceDaily: m.priceDaily, priceHourly: m.priceHourly, experience: m.experience, levelId: m.levelId, minWorkingHour: m.minWorkingHour })) } } })
      return created
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error)
    }
  }

  async findAll(page: number, limit: number, search: string, minYear:number,maxYear:number,year:number,fullName:string,isActive:boolean) {
    try {
      let skip = (page - 1) * limit
  
      let fltr: any = {}
      if (fullName) {
        fltr.fullName = { mode: "insensitive", contains: fullName }
      }
      if (isActive == true) {
        fltr.isActive = true
      }

      if (isActive == false) {
        fltr.isActive = false
      }

      if (year ) {
        fltr.year = year

      }
      else if(maxYear|| minYear){
        fltr.year={}
          if(minYear){
            fltr.year.gte = minYear;
          }
          if(maxYear){
            fltr.year.gte = maxYear;
          }
      }
      let find = await this.prisma.master.findMany({
        where: {AND:[fltr],OR:[
          {fullName:{startsWith:search,mode:"insensitive"}}
        ]},
        skip, take: limit
      })
      return find
    } catch (error) {
      console.log(error);
      
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.master.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let rating = await this.prisma.masterRatings.findMany({where:{masterId:id}})
      let rating1 = rating.length 
      ? rating.reduce((x, y) => x + y.star, 0) / rating.length 
      : 0;
      return {...find,avarageRating:rating.length}
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    try {
      let find = await this.prisma.master.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.master.update({ where: { id }, data: updateMasterDto })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.master.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.master.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
