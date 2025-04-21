import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({global: true}),JwtModule,ConfigModule,PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
