import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
    @ApiProperty({
        description: 'Название уровня на узбекском языке',
        example: 'Босқич 1',
    })
    nameUz: string;

    @ApiProperty({
        description: 'Название уровня на русском языке',
        example: 'Уровень 1',
    })
    nameRU: string;

    @ApiProperty({
        description: 'Название уровня на английском языке',
        example: 'Level 1',
    })
    nameEng: string;
}

