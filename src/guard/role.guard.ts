import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userRole } from 'generated/prisma';
import { Observable } from 'rxjs';
import { RoleKey } from 'src/decorators/role.guard';

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   let required  = this.reflector.getAllAndOverride(RoleKey,[context.getHandler(),context.getClass()])
   if(!required){
    return true 
   }
   try {
    let {user}= context.switchToHttp().getRequest()
    return required.some((roles:userRole)=>user.role(roles))
   } catch (error) {
    throw new UnauthorizedException()
   }

  }
}
