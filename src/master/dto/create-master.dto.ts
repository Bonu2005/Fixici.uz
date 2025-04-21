import { ApiProperty } from '@nestjs/swagger';

export class MasterProductDto {
  @ApiProperty({ example: 'abc123', description: 'ID продукта' })
  productId: string;

  @ApiProperty({ example: 3, description: 'Минимальное количество рабочих часов' })
  minWorkingHour: number;

  @ApiProperty({ example: 'level1', description: 'ID уровня квалификации' })
  levelId: string;

  @ApiProperty({ example: 50000, description: 'Почасовая оплата' })
  priceHourly: number;

  @ApiProperty({ example: 300000, description: 'Дневная оплата' })
  priceDaily: number;

  @ApiProperty({ example: 5, description: 'Опыт работы в годах' })
  experience: number;
}

export class CreateMasterDto {
  @ApiProperty({ example: 'Ali Karimov', description: 'Полное имя мастера' })
  fullName: string;

  @ApiProperty({ example: '+998901234567', description: 'Номер телефона' })
  phone: string;

  @ApiProperty({ example: true, description: 'Активен ли мастер' })
  isActive: boolean;

  @ApiProperty({ example: 2020, description: 'Год начала работы' })
  year: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Фото мастера' })
  image: string;

  @ApiProperty({ example: 'https://example.com/passport.jpg', description: 'Фото паспорта мастера' })
  passportImage: string;

  @ApiProperty({ example: 'Мастер по ремонту сантехники с большим опытом', description: 'Информация о мастере' })
  about: string;

  @ApiProperty({
    type: [MasterProductDto],
    description: 'Список продуктов/услуг, предоставляемых мастером',
  })
  masterProducts: MasterProductDto[];
}

export class MasterFilterDto{
  page:number
  limit:number
  phone:string
  search:string
  fullName:string
  year:number
  maxYear:number
  minYear:number
  isActive:boolean
}