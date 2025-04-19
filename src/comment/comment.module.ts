import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[AuthModule,ConfigModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
