import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { totp } from 'otplib';
import { Request } from 'express';
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
    return {message:"Successfully registered"}
    
  } catch (error) {
    throw new InternalServerErrorException()
  }
  }

 async login(loginAUthDto:LoginAuthDto,req:Request) {

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
    let sess = await this.prisma.session.findFirst({where:{ipAddress:req.ip,userId:find.id}})
    if(!sess){
      await this.prisma.session.create({data:{ipAddress:req.ip,userId:find.id}})
    }
    return {accessToken:this.generateAccessToken({id:find.id,role:find.role}),refreshToken:this.generateRefreshToken({id:find.id,role:find.role})}
   } catch (error) {
    throw new  InternalServerErrorException()
   }
  }

  sendOtp(phoneNumber:string) {
    try {
      let otp = totp.generate(`${phoneNumber}${this.configService.get<string>("otpSecret")}`)
      return otp
      
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  verify(phoneNumber:string,otp:string) {
   try {
    let match = totp.check(otp,`${phoneNumber}${this.configService.get<string>("otpSecret")}`)
    if(!match){
      return {message:"Wrong otp"}
    }
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }
  
  refreshToken(req:Request){
   try {
    let {id ,role } = req["user"]
    return {accessToken:this.generateAccessToken({id,role}),refreshToken:this.generateRefreshToken({id,role})}
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }
 async resetpassword(password:string,req:Request){
    try {
      let {id}= req["user"]
     let update = await this.prisma.user.update({where:{id},data:{password}})
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  
 async sendOtpReset(req:Request) {
    try {
      let {id}= req["user"]
      let find = await this.prisma.user.findUnique({where:{id}})
      if(!find){
        return {message:"User not found"}
      }
      let otp = totp.generate(`${find.phoneNumber}${this.configService.get<string>("otpSecret")}`)
      return otp
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

 async verifyReset(req:Request,otp:string) {
   try {
    let {id}= req["user"]
    let find = await this.prisma.user.findUnique({where:{id}})
    if(!find){
      return {message:"User not found"}
    }
    let match = totp.check(otp,`${find.phoneNumber}${this.configService.get<string>("otpSecret")}`)
    if(!match){
      return {message:"Wrong otp"}
    }
    return {message:"Otp successfully verifyed"}
   } catch (error) {
    throw new InternalServerErrorException()
   }
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
