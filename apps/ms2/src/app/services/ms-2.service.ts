import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  OnModuleDestroy,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { tap, Subject, from, concat, shareReplay, switchMap } from 'rxjs';

export interface Message {
  username: string;
  content: string;
}

@Injectable()
export class Ms2Service implements OnModuleDestroy {
  private chacheMessages$ = from(this.getCachedMessages()).pipe(
    tap((m) => console.log('cache length', m?.length)),
    switchMap((messages) => from(messages))
  );

  private messages = new Subject<Message>();
  public messages$ = concat(
    this.chacheMessages$,
    this.messages.asObservable()
  ).pipe(shareReplay(50));

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.messages$.pipe(
      tap(({ username, content }) => this.log(username, content))
    );
  }

  onModuleDestroy() {
    return this.cacheManager.set('messages', this.cache, { ttl: 0 });
  }

  public getMessages() {
    return this.messages$;
  }

  private cache?: Message[];
  private async getCachedMessages() {
    if (!this.cache) {
      this.cache = (await this.cacheManager.get<Message[]>('messages')) ?? [];
    }

    return this.cache;
  }

  private async cacheMessage(message: Message) {
    const messages = await this.getCachedMessages();
    this.cache = [...messages, message];
  }

  public async sendMessage(message: Message) {
    await this.cacheMessage(message);
    this.messages.next(message);

    this.log(message.username, message.content);

    return message;
  }

  number = 0;

  private log(username: string, content: string) {
    const id = String(++this.number).padStart(4, '0');
    const time = new Date().toISOString().slice(11, 19);
    console.log(`${id} ${time} -> ${username}: ${content.slice(0, 40)}`);
  }
}
