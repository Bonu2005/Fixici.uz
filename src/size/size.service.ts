import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) { }
  async create(createSizeDto: CreateSizeDto) {
    try {
      let created = await this.prisma.size.create({ data: createSizeDto })
      return created
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      let skip = (page - 1) * limit
      let find = await this.prisma.size.findMany({
        where: {
          OR: [
           { nameUz: { startsWith: search, mode: "insensitive" }},
           { nameRU: { startsWith: search, mode: "insensitive" }},
           { nameEng: { startsWith: search, mode: "insensitive" }},
          ]
        },
        skip, take: limit
      })
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.size.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      let find = await this.prisma.size.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.size.update({ where: { id }, data: updateSizeDto })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.size.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.size.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
