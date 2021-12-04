import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const host = process.env.HOST ?? 'localhost'
  const port = Number(process.env.PORT ?? '3000')
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(process.cwd(), 'public'))
  app.setBaseViewsDir(join(process.cwd(), 'public/views'))
  app.setViewEngine('hbs')

  await app.listen(port, host)
  console.log(`Listening on http://${host}:${port}`)
}
bootstrap()
