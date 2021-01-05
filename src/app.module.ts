import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '45c4afb74b5ebb',
          pass: 'fe06fb6f020b5c',
        },
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
