import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GuardGuard } from 'src/guard/guard.guard';
import { ConfigModule } from '@nestjs/config';
import { TelegrafService } from 'src/telegraf/telegraf.service';

@Module({
  imports: [AuthModule, ConfigModule,JwtModule],
  controllers: [OrderController],
  providers: [OrderService,TelegrafService],
})
export class OrderModule { }
