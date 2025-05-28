import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT') as string),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendEmail(createEmailDto: CreateEmailDto) {
    const mailOptions = {
      from: `"${createEmailDto.name}" <${createEmailDto.email}>`,
      to: this.configService.get('SMTP_USER'),
      subject: createEmailDto.subject,
      text: createEmailDto.message,
    };

    await this.transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  }
}
