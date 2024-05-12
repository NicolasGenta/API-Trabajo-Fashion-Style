import { Body, Controller, Post, Get, UseGuards, Res , Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './guard/auth.guard';

interface RequestWithUser extends Request {
    user: { 
        email :string, 
        role: string
    }
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async signIn(@Body() userDto: Record<string, any>, @Res() response): Promise<any> {

        try {
            const responseService = await this.authService.signIn(userDto.username, userDto.password);

            return response.status(200).json(responseService)
        }catch(err) {
            console.log(err);
            return response.status(500).json('Internal server error')
        }
    }

    @Post('register')
    register() {
        return 'register'
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req: RequestWithUser) {

        return req.user
    }
}
