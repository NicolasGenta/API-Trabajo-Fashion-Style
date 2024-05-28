import { Controller, Post, Res, Body, HttpCode, HttpStatus, Get, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { userLoginDto } from './userLogin.dto';
import { newUserDto } from './newUser.dto';
import { udpatePasswordDto } from './updatePassword.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get("/:id")
    async getUserById(@Res() res, @Param('id') id :number) {
        console.log(id, 'ingreso al endpoint');
        
        try {
            const responseFromService = await this.userService.getUser(id)
            console.log(responseFromService);
            
            if (responseFromService) {
                return res.status(HttpStatus.OK).json(responseFromService);
            }
        } catch (err) {
            console.log(err);
            
            return res.status(HttpStatus.NOT_FOUND);
        }
    }

    // @Post('login')
    // async getAuth(@Res() response, @Body() dataLogin : userLoginDto){
    //     try {
    //         const user = await this.userService.getAuth(dataLogin);
    //         if (user) {
    //             return response.status(HttpStatus.OK).json(user);
    //         } else {
    //             return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid Credentials' });
    //         }
    //     } catch (err) {
    //         console.error(err); // Registra el error para obtener más información en la consola
    //         return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    //     }
    // }

    @Post('register')
    async newUser(@Res() response, @Body() user: newUserDto){
        try{
            const responseFromService = await this.userService.createNewUser(user);
            if (responseFromService) {
                return response.status(HttpStatus.OK).json(responseFromService);
            } else {
                return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid Credentials' });
            }
        } catch (err) {
            console.error(err); // Registra el error para obtener más información en la consola
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

     @Put()
     async updatePassword(@Res() response, @Body() user : udpatePasswordDto) {
         try{
             const responseFromService = await this.userService.updatePassword(user);
             if (responseFromService) {
                 return response.status(HttpStatus.OK).json(responseFromService);
             }
         } catch (err) {
             console.error(err); // Registra el error para obtener más información en la consola
             return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
         }
     }

}
