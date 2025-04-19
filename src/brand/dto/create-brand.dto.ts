import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
    @ApiProperty({
        description: 'Название бренда на узбекском языке',
        example: 'Бренд 1',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название бренда на русском языке',
        example: 'Бренд 1',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название бренда на английском языке',
        example: 'Brand 1',
    })
    nameEng: string;
}
