import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './controllers/app.controller';
import { Ms1Controller } from './controllers/ms1.controller';
import { Ms2Controller } from './controllers/ms2.controller';
import { Ms1Service } from './services/ms1.service';
import { Ms2Service } from './services/ms2.service';
import { LoggerMiddleware } from '@decet/core/server';
import { ConfigService } from './services/config.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        db: 1,
      },
    }),
    BullModule.registerQueue({ name: 'email' }),
  ],
  controllers: [AppController, Ms1Controller, Ms2Controller],
  providers: [
    {
      provide: 'MS1_CLIENT',
      useFactory: ({ ms1 }: ConfigService) => ClientProxyFactory.create(ms1),
      inject: [ConfigService],
    },
    {
      provide: 'MS2_CLIENT',
      useFactory: ({ ms2 }: ConfigService) => ClientProxyFactory.create(ms2),
      inject: [ConfigService],
    },
    ConfigService,
    Ms1Service,
    Ms2Service,
    LoggerMiddleware,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
