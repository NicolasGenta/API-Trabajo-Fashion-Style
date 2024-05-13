import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService){}

    async signIn(username: string, 
        pass: string
        ): Promise<any> {
        const user = await this.usersService.getAuth(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {  sub: user.usuario_id, username: user.persona};
        const {password,...values} = user;
       return {
        access_token: await this.jwtService.signAsync(payload),
        user: values
    };
}

}
