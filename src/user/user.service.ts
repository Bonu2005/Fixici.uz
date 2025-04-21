import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}
 async findAll(page:number,limit:number,search:string) {
    try {
      let skip = (page-1)*limit
      let find = await this.prisma.user.findMany({
        where:{
          OR:[{
            fullName:{startsWith:search,mode:"insensitive"},
            phoneNumber:{startsWith:search,mode:"insensitive"},
            Bank:{startsWith:search,mode:"insensitive"},
            ADDRESS:{startsWith:search,mode:"insensitive"},
          }]
        },
        skip,
        take:limit
      })
      return find
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

 async findOne(id: string) {
    try {
      let find = await this.prisma.user.findUnique({where:{id}})
      if(!find){
        return {message:"No data with this id "}
      }
      return find
    } catch (error) {
       throw new BadRequestException(error)
    }
  }

async  update(id: string, updateUserDto: UpdateUserDto) {
   try {
    let {password} = updateUserDto
    if(password){
      return {message:"You cant change password please reset it"}
    }
    let updated = await this.prisma.user.update({where:{id},data:updateUserDto})
    return updated
   } catch (error) {
    throw new BadRequestException(error)
   }
  }
}
