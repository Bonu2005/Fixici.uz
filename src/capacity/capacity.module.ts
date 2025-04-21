import { Module } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CapacityController } from './capacity.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule,JwtModule,ConfigModule],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
