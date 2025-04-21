import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateToolDto, ToolFilterDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) { }
  async create(createToolDto: CreateToolDto) {
    try {
      let { sizeId, capacityId, brandId } = createToolDto
      let findSize = await this.prisma.size.findFirst({ where: { id: sizeId } })
      let findCapacity = await this.prisma.capacity.findFirst({ where: { id: capacityId } })
      let findBrand = await this.prisma.brand.findFirst({ where: { id: brandId } })
      if (!findSize || !findCapacity || !findBrand) {
        return { message: "Wrong id pleace recheeck seziId ,capacityId or brandId" }
      }
      let created = await this.prisma.tools.create({ data: { ...createToolDto, isActive: true } })
      return created
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  async findAll(page: number, limit: number, search: string) {
    try {
      let skip = (page - 1) * limit
      let find = await this.prisma.tools.findMany({
        where: {
          OR: [{
            nameUz: { startsWith: search, mode: "insensitive" },
            nameRU: { startsWith: search, mode: "insensitive" },
            nameEng: { startsWith: search, mode: "insensitive" },
            descriptionUz: { startsWith: search, mode: "insensitive" },
            descriptionRU: { startsWith: search, mode: "insensitive" },
            descriptionEng: { startsWith: search, mode: "insensitive" },
          }],
        },
        skip,
        take: limit,
        include:{
          size:true,
          brand:true,
          capacity:true
        }
      })
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  async findOne(id: string) {
    try {
      let find = await this.prisma.tools.findUnique({ where: { id },include:{size:true,brand:true,capacity:true}})
      if (!find) {
        return { message: "No data found with this id" }
      }
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    try {
      let find = await this.prisma.tools.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let {price,...body} = updateToolDto
      if(!price){
        let updated = await this.prisma.tools.update({ where: { id }, data: {...body} })
        return updated
      }
      let findBasket = await this.prisma.basket.findMany({where:{toolId:id}})
      if(!findBasket){
        let updated = await this.prisma.tools.update({ where: { id }, data: {...body} })
        return updated
      }
      await this.prisma.basket.deleteMany({where:{toolId:id}})
    } catch (error) {
      throw new BadRequestException(error)
    }
  }


  async remove(id: string) {
    try {
      let find = await this.prisma.tools.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.tools.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
