import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
