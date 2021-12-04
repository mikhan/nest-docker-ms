import { Module } from '@nestjs/common';
import { Ms2Controller } from './controllers/ms-2.controller';
import { Ms2Service } from './services/ms-2.service';

@Module({
  imports: [],
  controllers: [Ms2Controller],
  providers: [Ms2Service],
})
export class AppModule {}
