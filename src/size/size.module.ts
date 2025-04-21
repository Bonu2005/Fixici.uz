import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
