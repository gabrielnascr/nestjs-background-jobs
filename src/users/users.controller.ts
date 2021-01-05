import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('users')
export class UsersController {
  constructor(
    @InjectQueue('user') private userQueue: Queue,
    private readonly mailerService: MailerService,
  ) {}

  @Post('/')
  async register(@Body() userDto: any) {
    await this.userQueue.add('RegistrationMail', {
      user: userDto,
    });

    // Very fast ;-;
  }
}
