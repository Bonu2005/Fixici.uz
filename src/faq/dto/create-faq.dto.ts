import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
    @ApiProperty({
        description: 'Вопрос, который задается в FAQ',
        example: 'Как зарегистрироваться на платформе?',
    })
    question: string;

    @ApiProperty({
        description: 'Ответ на вопрос в FAQ',
        example: 'Для регистрации на платформе, нажмите на кнопку "Зарегистрироваться" и следуйте инструкциям.',
    })
    answer: string;
}
