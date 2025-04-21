import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
