import { ApiProperty } from '@nestjs/swagger';
import { orderStatus } from 'generated/prisma';

class MasterDto {
  @ApiProperty({
    example: 'clwxmgbce0000jx6sxbhv0k0d',
    description: 'ID мастера',
  })
  masterId: string;
}

export class UpdateOrderDto {
  @ApiProperty({
    enum: orderStatus,
    description: 'Статус заказа',
    example: 'COMPLETED',
  })
  status: orderStatus;

  @ApiProperty({
    type: [MasterDto],
    description: 'Массив объектов с ID мастеров',
    example: [
      { masterId: 'clwxmgbce0000jx6sxbhv0k0d' },
      { masterId: 'clwxmgbce0001jx6sxbhv0k0f' },
    ],
  })
  master: MasterDto[];
}
