import { ApiProperty } from '@nestjs/swagger';

export class MasterRating {
  @ApiProperty({ example: '6c600455-58ed-41c0-b899-6bc35c586c2a', description: 'ID мастера' })
  masterId: string;

  @ApiProperty({ example: 5, description: 'Оценка мастеру от 1 до 5' })
  star: number;
}

export class CreateCommentDto {
  @ApiProperty({ example: 'Очень хороший сервис!', description: 'Текст комментария' })
  text: string;

  @ApiProperty({ example: '96c7b2e2-8eeb-4cbd-a5cd-a27fb2826eaf', description: 'ID заказа' })
  orderId: string;
  userId: string;

  @ApiProperty({
    type: [MasterRating],
    description: 'Массив оценок для каждого мастера',
  })
  masterRatings: MasterRating[];
}
