import { Controller, Get, Res, HttpStatus, Param, Query, Put, Body, UseGuards, Post } from '@nestjs/common';
import { EmprendimientoService } from './emprendimiento.service';
import { Products } from 'src/entities/product.entity';
import { emprendimientoUdpatedDto } from './empUdpate.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { MailService } from 'src/mail/mail.service';
import { Response, response } from 'express';
import { RubroDto } from './dto/rubro.dto';
import { CategoryDTO } from './dto/categoria.dato';

@Controller('/emprendimiento')
export class EmprendimientoController {
  
       constructor(
        private readonly emprendimientoService: EmprendimientoService,
        private readonly mailService: MailService,
    ){}
    //👇 GETS
    @Get()
    async getEmprendimientos(@Res() response){
        try {
            const responseFromService = await this.emprendimientoService.getEmprendimientos();
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        }catch(err){
            return response.status(HttpStatus.NOT_FOUND).json({error: `${err}`})
        }
    }

    // @Get('/usuario')
    // async getProductosByEmprendimiento(@Res() response, @Query('idUsuario') idUsuario: number): Promise<Products[]> {
    //     try {
    //         const responseFromService = await this.emprendimientoService.getProductosByEmprendimiento(idUsuario);
    //         if (responseFromService) {
    //             return response.status(HttpStatus.OK).json(responseFromService);
    //         }
    //     } catch (error) {
    //         return response.status(HttpStatus.NOT_FOUND).json({ error: `Error al obtener categorías: ${error.message}` });
    //     }
    // }

    // @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    @Get('byUser/:id')
    async getEmprendimientoByUserId(@Res() response, @Param("id") id: number) {
        try {
            const responseFromService = await this.emprendimientoService.getEmprendimientoByUserId(id);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({message: `${err}`})
        }
    }
    
    // @UseGuards(AuthGuard)
    @Get('/rubros')
    async getRubros(@Res() response) {
        try {
            const responseFromService = await this.emprendimientoService.getRubros();
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({message: error})
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Administrador')
    @Post('/rubros')
    async crearRubros(@Res() response :Response, @Body() rubro :RubroDto) {
        try {
            console.log(rubro);
            
            const responseFromService = await this.emprendimientoService.crearRubro(rubro);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({message: `${error}`})
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Administrador')
    @Post('/categorias')
    async crearCategoria(@Res() response :Response, @Body() categoria :CategoryDTO) {
        try {
            const responseFromService = await this.emprendimientoService.crearCategoria(categoria);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({message: `${error}`})
        }
    }

    //👇 UPDATE
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Administrador')
    @Put()
    async actualizarEstado(@Res() response, @Body() emprendimientoUpdate: emprendimientoUdpatedDto){
        try{
            const responseFromService = await this.emprendimientoService.updateEmprendimientoStatus(emprendimientoUpdate);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService);
        }catch (err){
            return response.status(HttpStatus.NOT_FOUND).json({message: `${err}`})
        }
    }
    
    @Post('/send-email')
    async sendEmail(@Body() body: { to: string; from: string; subject: string; text: string }) {
        const { to, from, subject, text } = body;
        await this.mailService.sendMail(to, from, subject, text);
        return { message: 'Correo enviado con éxito' };    
    }
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    @Put('updateData/:id')
    async updateEmprendimientoData(@Param('id') id: number, @Body() emprendimiento, @Res() response) {
        try {
            const responseFromService = await this.emprendimientoService.updateEmprendimiento(id, emprendimiento);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService)
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({message: `${error}`})
        }
    }

    @UseGuards(AuthGuard, RolesGuard )
    @Post()
    async createEmprendimiento(@Body() emprendimiento, @Res() response) {
        try {
            const responseFromService = await this.emprendimientoService.createEmprendimiento(emprendimiento);
            if(responseFromService) return response.status(HttpStatus.OK).json(responseFromService)
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({message: error})
        }
    }
}
