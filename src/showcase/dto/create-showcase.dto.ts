import { ApiProperty } from '@nestjs/swagger';

export class CreateShowcaseDto {
    @ApiProperty({
        description: 'Название витрины на узбекском языке',
        example: 'Витрина 1',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название витрины на русском языке',
        example: 'Витрина 1',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название витрины на английском языке',
        example: 'Showcase 1',
    })
    nameEng: string;

    @ApiProperty({
        description: 'Описание витрины на узбекском языке',
        example: 'Эта витрина содержит товары для дома.',
    })
    descriptionUz: string;

    @ApiProperty({
        description: 'Описание витрины на русском языке',
        example: 'Эта витрина содержит товары для дома.',
    })
    descriptionRU: string;

    @ApiProperty({
        description: 'Описание витрины на английском языке',
        example: 'This showcase contains home goods.',
    })
    descriptionEng: string;

    @ApiProperty({
        description: 'Ссылка на изображение витрины',
        example: 'https://example.com/showcase.jpg',
    })
    image: string;

    @ApiProperty({
        description: 'Ссылка на внешний ресурс или страницу витрины',
        example: 'https://example.com/showcase',
    })
    link: string;
}
