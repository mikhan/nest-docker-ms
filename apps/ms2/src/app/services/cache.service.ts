import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

export interface Message {
  username: string;
  content: string;
}

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private cache?: Message[];
  private async loadCache() {
    this.cache = (await this.cacheManager.get<Message[]>('messages')) ?? [];
  }

  public async get() {
    if (!this.cache) await this.loadCache();

    return this.cache;
  }

  public async push(message: Message) {
    if (!this.cache) await this.loadCache();
    this.cache.push(message);
  }

  public async save() {
    if (this.cache) {
      await this.cacheManager.set('messages', this.cache, { ttl: 0 });
    }
  }
}
