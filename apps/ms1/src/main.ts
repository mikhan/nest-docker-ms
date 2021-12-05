import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const host = process.env.MS1_HOST ?? 'localhost';
  const port = Number(process.env.MS2_PORT ?? '3001');

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host, port },
  });

  await app.startAllMicroservices();
  console.log(`Listening on http://${host}:${port}`);
}
bootstrap();
