import { Controller, Get, Res, HttpStatus, Param, Query, Put, Body, UseGuards, Post } from '@nestjs/common';
import { EmprendimientoService } from './emprendimiento.service';
import { Products } from 'src/entities/product.entity';
import { emprendimientoUdpatedDto } from './empUdpate.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { MailService } from 'src/mail/mail.service';

@Controller('/emprendimiento')
export class EmprendimientoController {
  
       constructor(
        private readonly emprendimientoService: EmprendimientoService,
        private readonly mailService: MailService,
    ){}

    @Get()
    async getEmprendimientos(@Res() response){
        try {
            const responseFromService = await this.emprendimientoService.getEmprendimientos();
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        }catch(err){
            return response.status(HttpStatus.NOT_FOUND).json({error: `${err}`})
        }
    }

    @Get('/usuario')
    async getProductosByEmprendimiento(@Res() response, @Query('idUsuario') idUsuario: number): Promise<Products[]> {
        try {
            const responseFromService = await this.emprendimientoService.getProductosByEmprendimiento(idUsuario);
            if (responseFromService) {
                return response.status(HttpStatus.OK).json(responseFromService);
            }
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ error: `Error al obtener categorías: ${error.message}` });
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    @Get("/:id")
    async getEmprendimientoById(@Res() response, @Param("id") id :number){
        try{
            const responseFromService = await this.emprendimientoService.getEmprendimientoById(id);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        }catch (err){
            return response.status(HttpStatus.NOT_FOUND).json({message: `${err}`})
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    @Put()
    async actualizarEstado(@Res() response, @Body() emprendimientoUpdate: emprendimientoUdpatedDto){
        try{
            const responseFromService = await this.emprendimientoService.updateEmprendimiento(emprendimientoUpdate);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        }catch (err){
            return response.status(HttpStatus.NOT_FOUND).json({message: `${err}`})
        }
    }
    
    @Post('/send-email')
    async sendEmail(
      @Res() response,
      @Body() sendMailDto: { to: string; subject: string; text: string },
    ) {
      try {
        await this.mailService.sendMail(sendMailDto.to, sendMailDto.subject, sendMailDto.text);
        return response.status(HttpStatus.OK).json({ message: 'Correo enviado con éxito' });
      } catch (error) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: `Error al enviar el correo: ${error.message}` });
      }
    
  }

}
