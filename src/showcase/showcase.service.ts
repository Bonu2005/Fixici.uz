import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShowcaseService {
  constructor(private prisma: PrismaService) { }
  async create(createShowcaseDto: CreateShowcaseDto) {
    try {
      let created = await this.prisma.showCase.create({ data: createShowcaseDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      let skip = (page - 1) * limit
      let find = await this.prisma.showCase.findMany({
        where: {
          OR: [{
            nameUz: { startsWith: search, mode: "insensitive" },
            nameRU: { startsWith: search, mode: "insensitive" },
            nameEng: { startsWith: search, mode: "insensitive" },
            descriptionUz: { startsWith: search, mode: "insensitive" },
            descriptionRU: { startsWith: search, mode: "insensitive" },
            descriptionEng: { startsWith: search, mode: "insensitive" },
          }]
        },
        skip, take: limit
      })
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.showCase.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
  
  async update(id: string, updateShowcaseDto: UpdateShowcaseDto) {
    try {
      let find = await this.prisma.showCase.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.showCase.update({ where: { id }, data: updateShowcaseDto })
      return updated
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.showCase.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.showCase.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
