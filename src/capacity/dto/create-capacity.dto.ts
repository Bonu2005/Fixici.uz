import { ApiProperty } from '@nestjs/swagger';

export class CreateCapacityDto {
    @ApiProperty({
        description: 'Название емкости на узбекском языке',
        example: 'Емкость 1',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название емкости на русском языке',
        example: 'Емкость 1',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название емкости на английском языке',
        example: 'Capacity 1',
    })
    nameEng: string;
}
