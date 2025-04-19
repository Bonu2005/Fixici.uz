import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
    @ApiProperty({
        description: 'Название региона на узбекском языке',
        example: 'Ташкент',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название региона на русском языке',
        example: 'Ташкент',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название региона на английском языке',
        example: 'Tashkent',
    })
    nameEng: string;
}
