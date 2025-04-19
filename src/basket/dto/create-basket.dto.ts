import { ApiProperty } from '@nestjs/swagger';
import { MasterDaily } from 'generated/prisma';

export class CreateBasketDto {
    @ApiProperty({
        description: 'ID продукта',
        example: '12345abc',
    })
    productId: string;

    @ApiProperty({
        description: 'Количество продуктов',
        example: 10,
    })
    productCount: number;

    @ApiProperty({
        description: 'Количество единиц продукта',
        example: 2,
    })
    quantity: number;

    @ApiProperty({
        description: 'Мера измерения (например, кг, литры и т.д.)',
        example: 0.5,
    })
    measure: number;

    @ApiProperty({
        description: 'ID инструмента, связанного с продуктом',
        example: 'tool123',
    })
    toolId: string;

    @ApiProperty({
        description: 'Общая стоимость',
        example: 200,
    })
    total: number;

    @ApiProperty({
        description: 'ID пользователя',
        example: 'user789',
    })
    userId: string;

    @ApiProperty({
        description: 'Единица времени (например, день, неделя, месяц и т.д.)',
        example: 'day',
        enum: ['day', 'week', 'month', 'year'],
    })
    timeUnit: MasterDaily;

    @ApiProperty({
        description: 'ID уровня',
        example: 'level789',
    })
    levelId: string;

}
