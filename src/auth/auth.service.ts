import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService,private jwt:JwtService,private configService:ConfigService){}
  async register(createAuthDto: CreateAuthDto) {
  try {

    let {password ,phoneNumber,role,regionId} =createAuthDto
    if(role!="USER_FIZ" && role!="USER_YUR"){
        return {message:"This register only for USER_FIZ and USER_YUR"}
    }
    let find = await  this.prisma.user.findFirst({where:{phoneNumber}})
    if(find){
     return {message:"Already exists this phoneNumber "}
    }
    let region = await this.prisma.region.findFirst({where:{id:regionId}})
    if(!region){
      return {message:"No region with this Id"}
    }
    let hash = bcrypt.hashSync(password,10)
    let created  = await this.prisma.user.create({data:{...createAuthDto,password:hash,phoneNumber,role,status:"ACTIVE"}})
    return {message:"Successfully created"}
    
  } catch (error) {
    throw new InternalServerErrorException()
  }
  }

 async login(loginAUthDto:LoginAuthDto) {

   try {
    let {password,phoneNumber}= loginAUthDto
    let find = await this.prisma.user.findFirst({where:{phoneNumber}})
    if(!find){
      return {message:"Not found phoneNumber"}
    }
    let match = bcrypt.compareSync(password,find.password)
    if(!match){
      return {message:"Wrong credentials"}
    }
    return {accessToken:this.generateAccessToken({id:find.id,role:find.role}),refreshToken:this.generateRefreshToken({id:find.id,role:find.role})}
   } catch (error) {
    throw new  InternalServerErrorException()
   }
  }

  sendOtp() {
    return `This action returns auth`;
  }

  verify() {
    return `This action updates a auth`;
  }
  
  refreshToken(){

  }
  resetpassword(){
    
  }
  generateAccessToken(payload:any){
  try {
    return this.jwt.sign(payload,{secret:this.configService.get<string>('accessSecret'),expiresIn:"1h"})
  } catch (error) {
    throw new InternalServerErrorException()
  }
  }
  generateRefreshToken(payload:any){
    try {
      return this.jwt.sign(payload,{secret:this.configService.get<string>('refreshSecret'),expiresIn:"7d"})
    } catch (error) {
      throw new InternalServerErrorException()
    }
    }

}
