import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto, } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    try {
      let { levels, tools, ...body } = createProductDto
      let find = await this.prisma.level.findMany({ where: { id: { in: levels.map((l) => l.levelId) } } })
      if (find.length !== levels.length) {
        return {
          message: 'One or more levels IDs do not exist.',
          found: find.map((m) => m.id),
        };
      }
      let findTools = await this.prisma.tools.findMany({ where: { id: { in: tools.map((t) => t.toolId) } } })
      if (findTools.length !== tools.length) {
        return {
          message: 'One or more tools IDs do not exist.',
          found: findTools.map((m) => m.id),
        };
      }
      let created = await this.prisma.product.create({
        data: {
          ...body, isActive: true, productLevels: {
            create: levels.map((l) => ({
              levelId: l.levelId,
               priceHourly: l.priceHourly,
              priceDaily: l.priceDaily,
              minWorkingHour: l.minWorkingHour,
            }))
          }, ProductTools: { create: tools.map((t) => ({ toolId: t.toolId })) }
        }
      })
      return created
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error)
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      let skip = (page - 1) * limit


      let find = await this.prisma.product.findMany({
        where: {
          OR: [
            {
              nameUz: { startsWith: search, mode: "insensitive" },
              nameRU: { startsWith: search, mode: "insensitive" },
              nameEng: { startsWith: search, mode: "insensitive" }
            }
          ],
        },
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
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      let find = await this.prisma.product.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.product.update({ where: { id }, data: updateProductDto })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.product.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data found with this id" }
      }
      let updated = await this.prisma.product.delete({ where: { id } })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
