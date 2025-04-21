import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule,ConfigModule,PrismaModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
