import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('user')
export class UserProcessor {
  constructor(private readonly mailerService: MailerService) {}
  private logger = new Logger(UserProcessor.name);

  @Process('RegistrationMail')
  async handle({ data }: Job) {
    const { user } = data;

    this.logger.log(JSON.stringify(data));
    this.logger.log(`Sending mail to ${user.email}`);

    await this.mailerService.sendMail({
      to: user.email,
      from: 'teste@gmail.com',
      subject: 'Testing queue',
      html: '<h1>Registration user mail</h1>',
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }
}
