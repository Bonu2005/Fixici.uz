import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
    @ApiProperty({
        description: 'Название инструмента на узбекском языке',
        example: 'Дрель',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название инструмента на русском языке',
        example: 'Дрель',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название инструмента на английском языке',
        example: 'Drill',
    })
    nameEng: string;

    @ApiProperty({
        description: 'Описание инструмента на узбекском языке',
        example: 'Мощная дрель для работы с бетоном',
    })
    descriptionUz: string;

    @ApiProperty({
        description: 'Описание инструмента на русском языке',
        example: 'Мощная дрель для работы с бетоном',
    })
    descriptionRU: string;

    @ApiProperty({
        description: 'Описание инструмента на английском языке',
        example: 'Powerful drill for working with concrete',
    })
    descriptionEng: string;

    @ApiProperty({
        description: 'Цена инструмента',
        example: 150.5,
    })
    price: number;

    @ApiProperty({
        description: 'Количество инструмента в наличии',
        example: 30,
    })
    quantity: number;

    @ApiProperty({
        description: 'Код инструмента',
        example: 123456,
    })
    code: number;

    @ApiProperty({
        description: 'URL изображения инструмента',
        example: 'https://example.com/image.jpg',
    })
    image: string;

    @ApiProperty({
        description: 'ID бренда инструмента',
        example: 'brand123',
    })
    brandId: string;

    @ApiProperty({
        description: 'Статус активности инструмента (доступен или нет)',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: 'ID емкости инструмента',
        example: 'capacity123',
    })
    capacityId: string;

    @ApiProperty({
        description: 'ID размера инструмента',
        example: 'size123',
    })
    sizeId: string;
}

export class ToolFilterDto{
  price :number
  brandId:string
  sizeId:string
  capacityId:string
}