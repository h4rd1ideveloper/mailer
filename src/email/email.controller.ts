import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send') send(@Body() createEmailDto: CreateEmailDto) {
    try {
      return this.emailService.sendEmail(createEmailDto);
    } catch (e) {
      throw new HttpException(
        'Internal server error:' + ' ' + e?.message || '!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }
}
