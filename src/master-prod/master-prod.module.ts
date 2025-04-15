import { Module } from '@nestjs/common';
import { MasterProdService } from './master-prod.service';
import { MasterProdController } from './master-prod.controller';

@Module({
  controllers: [MasterProdController],
  providers: [MasterProdService],
})
export class MasterProdModule {}
