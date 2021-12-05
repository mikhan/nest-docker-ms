import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { Ms2Controller } from './controllers/ms-2.controller';
import { Ms2Service } from './services/ms-2.service';

const host = process.env.REDIS_HOST ?? 'localhost'
const port = Number(process.env.REDIS_PORT ?? '6379')
const password = process.env.REDIS_PASSWORD ?? 'root'

@Module({
  imports: [
    CacheModule.register<RedisClientOpts>({
      store: redisStore,
      host: host,
      port: port,
      auth_pass: password,
    }),
  ],
  controllers: [Ms2Controller],
  providers: [Ms2Service],
})
export class AppModule {}
