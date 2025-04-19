import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) { }
  async create(createLevelDto: CreateLevelDto) {
    try {
      let created = await this.prisma.level.create({ data: createLevelDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      let skip = (page - 1) * limit
      let find = await this.prisma.level.findMany(
        {
          where: {
            OR: [
              
               { nameUz: { startsWith: search, mode: "insensitive" }},
               { nameRU: { startsWith: search, mode: "insensitive" }},
               { nameEng: { startsWith: search, mode: "insensitive" }}, 
              
            ]
          }, skip, take: limit
        }
      )
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }


  async findOne(id: string) {
    try {
      let find = await this.prisma.level.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    try {
      let find = await this.prisma.level.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.level.update({ where: { id }, data: updateLevelDto })
      return updated
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.level.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.level.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
