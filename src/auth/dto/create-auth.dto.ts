import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator"
import { userRole, userStatus } from "generated/prisma"

export class CreateAuthDto {
    @ApiProperty({
        description: 'Полное имя пользователя',
        example: 'Иван Иванов',
    })
    fullName: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        example: 'password123',
    })
    password: string;

    @ApiProperty({
        description: 'Номер телефона пользователя',
        example: '+998901234567',
    })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({
        description: 'ID региона пользователя',
        example: 'region123',
    })
    regionId: string;

    @ApiProperty({
        description: 'Идентификационный номер налогоплательщика (по желанию)',
        example: '123456789012',
        required: false,
    })
    IIN?: string;

    @ApiProperty({
        description: 'МФО банка (по желанию)',
        example: '12345',
        required: false,
    })
    MFO?: string;

    @ApiProperty({
        description: 'Рассчетный счет пользователя (по желанию)',
        example: '1234567890',
        required: false,
    })
    RS?: string;

    @ApiProperty({
        description: 'Название банка пользователя (по желанию)',
        example: 'Народный банк',
        required: false,
    })
    Bank?: string;

    @ApiProperty({
        description: 'ОКЭД (по желанию)',
        example: '47.99',
        required: false,
    })
    OKED?: string;

    @ApiProperty({
        description: 'Адрес пользователя',
        example: 'г. Ташкент, ул. Абдуллаева, д. 10',
    })
    ADDRESS: string;

    @ApiProperty({
        description: 'Роль пользователя',
        enum: userRole, // Перечисление userRole из Prisma
        example: 'USER_FIZ', // Пример для значения роли
    })
    role: userRole;

    // @ApiProperty({
    //     description: 'Статус пользователя',
    //     enum: userStatus, // Перечисление userStatus из Prisma
    //     example: 'active', // Пример для значения статуса
    // })
    status: userStatus;
}

export class LoginAuthDto {
    @ApiProperty({
        description: 'Номер телефона пользователя для входа в систему',
        example: '+998901234567',
    })
    phoneNumber: string;

    @ApiProperty({
        description: 'Пароль пользователя для входа в систему',
        example: 'password123',
    })
    password: string;
}

export class AdminAuthDto{
    @ApiProperty({
        description: 'Полное имя пользователя',
        example: 'Иван Иванов',
    })
    fullName: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        example: 'password123',
    })
    password: string;

    @ApiProperty({
        description: 'Номер телефона пользователя',
        example: '+998901234567',
    })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({
        description: 'ID региона пользователя',
        example: 'region123',
    })
    regionId: string;

    @ApiProperty({
        description: 'Адрес пользователя',
        example: 'г. Ташкент, ул. Абдуллаева, д. 10',
    })
    ADDRESS: string;

    @ApiProperty({
        description: 'Роль пользователя',
        enum: userRole, // Перечисление userRole из Prisma
        example: 'ADMIN', // Пример для значения роли
    })
    role: userRole;

    // @ApiProperty({
    //     description: 'Статус пользователя',
    //     enum: userStatus, // Перечисление userStatus из Prisma
    //     example: 'active', // Пример для значения статуса
    // })
    status: userStatus;
}