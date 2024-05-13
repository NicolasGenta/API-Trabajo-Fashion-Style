import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";
import { Reflector } from "@nestjs/core";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
          return true; // No se ha definido ningún rol, permitir acceso
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}