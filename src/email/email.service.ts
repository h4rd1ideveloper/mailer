import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const config: SMTPTransport.Options = {
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT') as string),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    console.log({ config });

    this.transporter = nodemailer.createTransport(config, {
      logger: true,
      debug: true,
    });
  }

  async sendEmail(createEmailDto: CreateEmailDto) {
    const mailOptions = {
      from: `"${createEmailDto.name}" <${this.configService.get('SMTP_USER')}>`,
      to: this.configService.get('SMTP_USER'),
      subject: `
      message: ${createEmailDto.message}
      
      from:"${createEmailDto.name}" <${createEmailDto.email}>
      `,
      text: createEmailDto.message,
      replyTo: createEmailDto.email,
    };

    await this.transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  }
}
