import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorator/roles.decorator'
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      console.log("Required roles: ", requiredRoles)
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest();
      console.log("User: ", user, requiredRoles)
      return requiredRoles.some((role) => user.role === role);
    }
  }
  