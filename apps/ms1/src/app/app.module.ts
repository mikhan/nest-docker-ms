import { Module } from '@nestjs/common';
import { Ms1Controller } from './controllers/ms-1.controller';
import { Ms1Service } from './services/ms-1.service';

@Module({
  imports: [],
  controllers: [Ms1Controller],
  providers: [Ms1Service],
})
export class AppModule {}
