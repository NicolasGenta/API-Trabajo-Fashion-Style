import { Body, Controller, Post, Get, UseGuards, Res , Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';

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

    @UseGuards(AuthGuard)
    @Post('register')
    async register(@Res() response) {
        try {
            const responseFromService = await this.authService.logout();

            return response.status(200).json({message: 'user created'})
        } catch (error) {
            return response.status(500).json('Internal Server Error')
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req: RequestWithUser) {

        return req.user
    }
}
