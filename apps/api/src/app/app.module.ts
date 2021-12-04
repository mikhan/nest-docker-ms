import { BullModule } from '@nestjs/bull'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './controllers/app.controller'
import { Ms1Controller } from './controllers/ms1.controller'
import { Ms2Controller } from './controllers/ms2.controller'
import { Ms1Service } from './services/ms1.service'
import { Ms2Service } from './services/ms2.service'
import { LoggerMiddleware } from '@decet/core/server'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS1_CLIENT',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'MS2_CLIENT',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
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
  providers: [Ms1Service, Ms2Service, LoggerMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
