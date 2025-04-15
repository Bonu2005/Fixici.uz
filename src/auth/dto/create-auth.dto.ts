import { IsPhoneNumber } from "class-validator"
import { userRole, userStatus } from "generated/prisma"

export class CreateAuthDto {
    fullName    :string
    password    :string
    @IsPhoneNumber()
    phoneNumber :string
    regionId    :string
    IIN?        :string
    MFO?        :string
    RS?        :string
    Bank?      :string
    OKED?        :string
    ADDRESS     :string
    role        :userRole
    status      :userStatus
}

export class LoginAuthDto{
    phoneNumber:string
    password:string
}
