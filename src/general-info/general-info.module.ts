import { Module } from '@nestjs/common';
import { GeneralInfoService } from './general-info.service';
import { GeneralInfoController } from './general-info.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [GeneralInfoController],
  providers: [GeneralInfoService],
})
export class GeneralInfoModule {}
