import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
