import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    try {
      const config = {
        host: this.configService.get('SMTP_HOST'),
        port: parseInt(this.configService.get('SMTP_PORT') as string),
        secure: false,
        auth: {
          user: this.configService.get('SMTP_USER'),
          pass: this.configService.get('SMTP_PASS'),
        },
      };
      console.log({ config });
      this.transporter = nodemailer.createTransport(config);
    } catch (e) {
      console.log(e);
      throw new Error('Não foi possivel criar o transporter');
    }
  }

  async sendEmail(createEmailDto: CreateEmailDto) {
    try {
      console.log({ createEmailDto });
      const mailOptions = {
        from: `"${createEmailDto.name}" <${createEmailDto.email}>`,
        to: this.configService.get('SMTP_USER'),
        subject: createEmailDto.subject,
        text: createEmailDto.message,
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Email sent successfully' };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: 'Erro ao enviar email:' + e?.message || '',
      };
    }
  }
}
