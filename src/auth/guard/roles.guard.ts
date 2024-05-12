import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const role = this.reflector.getAllAndOverride('roles', [
      context.getHandler(), 
      context.getClass()]);

      if(!role) {
        return true;
      }

    console.log(role);
    const {user} = context.switchToHttp().getRequest();
    console.log(user.role);
    
    return role === user.role;
  }
}
