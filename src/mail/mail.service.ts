import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Cambia esto por tu proveedor SMTP
      port: 465,
      secure: true, // true para 465, false para otros puertos
      auth: {
        user: 'emprende.dev11@gmail.com', // tu correo electrónico
        pass: 'vcsb iwgq apev lavh', // tu contraseña
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'emprende.dev11@gmail.com',
      to,
      subject,
      text,

    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado con éxito');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  }
}