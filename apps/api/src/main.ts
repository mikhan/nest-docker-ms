import { loggerMiddleware } from '@decet/core/server'
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { ConfigService } from './app/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.use(loggerMiddleware)

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  const { api, ms1, ms2 } = app.get(ConfigService);

  await app.listen(api.options.port, api.options.host);


  console.log(`Listening api@http://${api.options.host}:${api.options.port}`);
  console.log(`Listening ms1@http://${ms1.options.host}:${ms1.options.port}`);
  console.log(`Listening ms2@http://${ms2.options.host}:${ms2.options.port}`);
}
bootstrap();
