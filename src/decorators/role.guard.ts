import { SetMetadata } from "@nestjs/common"
import { userRole } from "generated/prisma"

export const RoleKey = "role"

export const Role = (...roles:userRole[])=>SetMetadata(RoleKey,roles)
console.log(Role);
