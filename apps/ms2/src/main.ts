import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const host = process.env.HOST ?? 'localhost'
  const port = Number(process.env.PORT ?? '3002')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host, port },
    },
  )
  await app.listen()
  console.log(`Listening on http://${host}:${port}`)

  // const app = await NestFactory.create(Ms2Module)
  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   //options: { port: 3002 },
  // })

  // app.startAllMicroservices()
}
bootstrap()
