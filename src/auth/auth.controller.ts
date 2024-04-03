import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {userDto} from '../auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDto: Record<string, any>) {
     return this.authService.signIn(userDto.user.name, userDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
