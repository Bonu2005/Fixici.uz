import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { BrandModule } from './brand/brand.module';
import { CapacityModule } from './capacity/capacity.module';
import { SizeModule } from './size/size.module';
import { LevelModule } from './level/level.module';
import { UserModule } from './user/user.module';
import { ToolsModule } from './tools/tools.module';
import { ProductModule } from './product/product.module';
import { MasterModule } from './master/master.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { BasketModule } from './basket/basket.module';
import { GeneralInfoModule } from './general-info/general-info.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { PartnersModule } from './partners/partners.module';
import { PrismaModule } from './prisma/prisma.module';
import { EskizModule } from './eskiz/eskiz.module';
import { JwtModule } from '@nestjs/jwt';
import { UploadsModule } from './uploads/uploads.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, RegionModule, BrandModule, CapacityModule, SizeModule, LevelModule, UserModule, ToolsModule, ProductModule, MasterModule, OrderModule, CommentModule, BasketModule, GeneralInfoModule, ContactModule, FaqModule, ShowcaseModule, PartnersModule, PrismaModule, EskizModule, UploadsModule,ServeStaticModule.forRoot({rootPath:join(__dirname,"..","uploads"),serveRoot:'/file'})],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports:[ ConfigService]
})
export class AppModule {}
