import { Controller, Post, Body, Options, Req, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send') send(@Body() createEmailDto: CreateEmailDto) {
    console.log({ createEmailDto });
    return this.emailService.sendEmail(createEmailDto);
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
