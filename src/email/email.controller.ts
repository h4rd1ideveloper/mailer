import {
  Controller,
  Post,
  Body,
  Options,
  Req,
  Res,
  HttpException,
  HttpStatus,
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

  @Options('send') options(@Req() req, @Res() res) {
    res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      .status(204)
      .send();
  }
}
