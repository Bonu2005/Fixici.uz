import { ApiProperty } from "@nestjs/swagger";
import { MasterDaily, orderStatus, paymentType } from "generated/prisma"

export class CreateOrderProductDto {
    // @ApiProperty({ example: 'order-uuid-123', description: 'ID заказа (можно не указывать при создании)' })
    // orderId: string;
  
    @ApiProperty({ example: '4304f645-4cac-4e11-bb38-7bc3392910e8', description: 'ID продукта' })
    productId: string;
  
    @ApiProperty({ example: '2a4f3ed1-db72-4c98-ab4c-576cb3e71112', description: 'ID уровня' })
    levelId: string;
  
    @ApiProperty({ example: '02f84bfd-6633-4ee5-a6f5-e669ff274624', description: 'ID инструмента' })
    toolId: string;
  
    @ApiProperty({ example: 2, description: 'Количество' })
    count: number;
  
    @ApiProperty({ example: 50000, description: 'Цена' })
    price: number;
  
    @ApiProperty({ example: 3, description: 'Время работы' })
    workingTime: number;
  
    @ApiProperty({ enum: MasterDaily, description: 'Единица времени (например: DAY, HOUR)' })
    timeUnit: MasterDaily;
  }
  
export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    productCount: number;
  
    @ApiProperty({ example: 10 })
    quantity: number;
  
    @ApiProperty({ example: 1 })
    measure: number;
  
    @ApiProperty({ example: 2 })
    tool: number;
  
    @ApiProperty({ example: 150000 })
    total: number;
  
    @ApiProperty({ example: '41.3111, 69.2797', description: 'Геолокация пользователя' })
    location: string;
  
    @ApiProperty({ example: 'г. Ташкент, ул. Навои 12' })
    address: string;
  
    @ApiProperty({ example: '2025-04-20T12:00:00.000Z' })
    date: Date;
  
    @ApiProperty({ enum: paymentType, example: paymentType.CASH })
    paymentType: paymentType;
  
    @ApiProperty({ example: true })
    withDelivery: boolean;
  

    status: orderStatus;
  
    @ApiProperty({ example: 'Позвоните за 30 минут до доставки' })
    commentToDelivery: string;
    userId: string;
  
    @ApiProperty({
      type: [CreateOrderProductDto],
      description: 'Список продуктов в заказе',
    })
    orderProduct: CreateOrderProductDto[];
  }
export class OrderFilter {
    date:Date
    total:number
    status:orderStatus
}