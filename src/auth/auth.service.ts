import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService) { }

    async signIn(username: string, pass: string): Promise<any> {
        try {
            const user = await this.usersService.getAuth(username);
            const verify = await this.comparePassword(pass, user.password)

            if (!verify) {
                throw new UnauthorizedException();
            }
            const { usuario_id } = user;
            const payload = { user_id: usuario_id, role: user.rol_id.rol_name };
            const token = await this.jwtService.signAsync(payload);

            const userData = await this.usersService.getUser(usuario_id)
            
            return {
                token,
                userData
            };

        }catch(err) {
            throw new Error(err.message);
        }
    }

    async logout() {

    }

    private async comparePassword(userPassword :string, storedHash :string) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(userPassword, storedHash, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
