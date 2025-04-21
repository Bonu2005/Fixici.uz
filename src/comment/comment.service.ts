import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
@Injectable()
export class CommentService {
  constructor(private prisma:PrismaService){}
 async create(createCommentDto: CreateCommentDto,req:Request) {
   try {
    let {id} = req["user"]
    console.log(id);
    
    let {masterRatings, ...data} = createCommentDto
    let findOrder = await this.prisma.order.findUnique({where:{id:data.orderId}})
    if(!findOrder){
      return {message:"No data with  this id"}
    }
    let findMasters = await this.prisma.master.findMany({where:{id:{in:masterRatings.map((m)=>m.masterId)}}})
    if(findMasters.length!==masterRatings.length){
     return {message: 'One or more master IDs do not exist.',
       found: findMasters.map((m) => m.id),
      }
    }
       let created = await this.prisma.comment.create({data:{...data,userId:id,MasterRatings:{create:masterRatings}}})
       return created
      } catch (error) {
        console.log(error);
        
       throw new BadRequestException(error)
      }
  }

 async findAll() {
  try {
    let find = await this.prisma.comment.findMany()
    return find
  } catch (error) {
    throw new BadRequestException(error)
  }
  }

 async findOne(id: string) {
  try {
    let find = await this.prisma.comment.findUnique({where:{id}})
    if(!find){
     return {message:"No data found with this id"}
    }
  } catch (error) {
   throw new BadRequestException(error)
  }
  }

 async update(id: string, updateCommentDto: UpdateCommentDto) {
  try {
    let find = await this.prisma.comment.findUnique({where:{id}})
    if(!find){
     return {message:"No data found with this id"}
    }
    let updated = await this.prisma.comment.update({where:{id},data:updateCommentDto})
    return updated
  } catch (error) {
   throw new BadRequestException(error)
  }
  }

 async remove(id: string) {
  try {
    let find = await this.prisma.comment.findUnique({where:{id}})
    if(!find){
     return {message:"No data found with this id"}
    }
    let updated = await this.prisma.comment.delete({where:{id}})
    return updated
  } catch (error) {
   throw new BadRequestException(error)
  }
  }
}
