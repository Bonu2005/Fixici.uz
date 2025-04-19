import { ApiProperty } from '@nestjs/swagger';

class LevelDto {
  @ApiProperty({
    description: 'ID уровня',
    example: 'level-id-example',
  })
  levelId: string;

  @ApiProperty({
    description: 'Почасовая стоимость',
    example: 100,
  })
  priceHourly: number;

  @ApiProperty({
    description: 'Стоимость за день',
    example: 500,
  })
  priceDaily: number;

  @ApiProperty({
    description: 'Минимальное количество рабочих часов',
    example: 2,
  })
  minWorkingHour: number;

  @ApiProperty({
    description: 'Дата уровня',
    example: '2025-04-19T10:30:00.000Z',
  })
  levelts: string; // или Date
}

class ToolDto {
  @ApiProperty({
    description: 'ID инструмента',
    example: 'tool-id-example',
  })
  toolId: string;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Название продукта на узбекском языке',
    example: 'Махсулот исми (Узбекча)',
  })
  nameUz: string;

  @ApiProperty({
    description: 'Название продукта на русском языке',
    example: 'Название продукта (на русском)',
  })
  nameRU: string;

  @ApiProperty({
    description: 'Название продукта на английском языке',
    example: 'Product name in English',
  })
  nameEng: string;

  @ApiProperty({
    description: 'URL изображения продукта',
    example: 'http://example.com/image.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Активность продукта (активен/неактивен)',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: [LevelDto],  // Указываем, что это массив объектов LevelDto
    description: 'Массив уровней, связанных с продуктом',
    example: [
      {
        levelId: '02f84bfd-6633-4ee5-a6f5-e669ff274624',
        priceHourly: 100,
        priceDaily: 500,
        minWorkingHour: 2,
        levelts: '2025-04-19T10:30:00.000Z',
      },
    ],
  })
  levels: LevelDto[];

  @ApiProperty({
    type: [ToolDto],  // Указываем, что это массив объектов ToolDto
    description: 'Массив инструментов, связанных с продуктом',
    example: [
      {
        toolId: '02f84bfd-6633-4ee5-a6f5-e669ff274624',
      },
    ],
  })
  tools: ToolDto[];
}
