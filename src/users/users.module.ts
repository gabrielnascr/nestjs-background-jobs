import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserProcessor } from './users.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'user',
    }),
  ],
  controllers: [UsersController],
  providers: [UserProcessor],
})
export class UsersModule {}
