import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
    @ApiProperty({
        description: 'Название партнера на узбекском языке',
        example: 'Партнёр 1',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название партнера на русском языке',
        example: 'Партнёр 1',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название партнера на английском языке',
        example: 'Partner 1',
    })
    nameEng: string;

    @ApiProperty({
        description: 'Ссылка на изображение партнера',
        example: 'https://example.com/image.jpg',
    })
    image: string;
}
