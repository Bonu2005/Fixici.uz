import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
