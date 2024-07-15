import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'emprende.dev11@gmail.com',
        pass: 'vcsb iwgq apev lavh',
      },
    });
  }

  async sendMail(to: string, from: string, subject: string, text: string) {
    const mailOptions = {
      from: `Emprende <emprende.dev11@gmail.com>`,
      replyTo: from,
      to,
      subject,
      text
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado con éxito');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  }

  async sendEmailWithBody (to: string, subject: string, body) {
    const mailOptions = {
      from: `Emprende <emprende.dev11@gmail.com>`,
      to,
      subject,
      html: body
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
