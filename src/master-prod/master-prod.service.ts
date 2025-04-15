import { Injectable } from '@nestjs/common';
import { CreateMasterProdDto } from './dto/create-master-prod.dto';
import { UpdateMasterProdDto } from './dto/update-master-prod.dto';

@Injectable()
export class MasterProdService {
  create(createMasterProdDto: CreateMasterProdDto) {
    return 'This action adds a new masterProd';
  }

  findAll() {
    return `This action returns all masterProd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterProd`;
  }

  update(id: number, updateMasterProdDto: UpdateMasterProdDto) {
    return `This action updates a #${id} masterProd`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterProd`;
  }
}
