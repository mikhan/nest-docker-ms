import type { RedisOptions } from 'ioredis';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Ms2Controller } from './controllers/ms-2.controller';
import { Ms2Service } from './services/ms-2.service';

const host = process.env.REDIS_HOST ?? 'localhost';
const port = Number(process.env.REDIS_PORT ?? '6379');
const database = Number(process.env.REDIS_DATABASE ?? '0');
const password = process.env.REDIS_PASSWORD ?? 'root';

console.log(
  `Connected to redis://${host}:${port}/${database}?password=${password}`
);

@Module({
  imports: [
    RedisModule.forRoot({
      closeClient: true,
      config: {
        host: host,
        port: port,
        //password: password,
        db: database,
      },
    }),

    CacheModule.register<RedisOptions>({
      store: redisStore,
      host: host,
      port: port,
      //password: password,
      db: database,
    }),
  ],
  controllers: [Ms2Controller],
  providers: [Ms2Service],
})
export class AppModule {}
