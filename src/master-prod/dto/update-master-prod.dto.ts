import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterProdDto } from './create-master-prod.dto';

export class UpdateMasterProdDto extends PartialType(CreateMasterProdDto) {}
