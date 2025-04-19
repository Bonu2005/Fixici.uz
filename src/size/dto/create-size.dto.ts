import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDto {
    @ApiProperty({
        description: 'Название размера на узбекском языке',
        example: 'Маленький',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название размера на русском языке',
        example: 'Маленький',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название размера на английском языке',
        example: 'Small',
    })
    nameEng: string;
}
