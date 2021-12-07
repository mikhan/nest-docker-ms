import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { tap, Subject, from, concat, shareReplay, switchMap } from 'rxjs';
import { CacheService } from './cache.service';

export interface Message {
  username: string;
  content: string;
}

@Injectable()
export class Ms2Service implements OnModuleDestroy {
  private chacheMessages$ = from(this.cacheService.get()).pipe(
    switchMap((messages) => from(messages))
  );

  private messages = new Subject<Message>();
  public messages$ = concat(
    this.chacheMessages$,
    this.messages.asObservable()
  ).pipe(shareReplay(50));

  constructor(private cacheService: CacheService) {
    this.messages$.pipe(
      tap(({ username, content }) => this.log(username, content))
    );
  }

  onModuleDestroy() {
    return this.cacheService.save();
  }

  public getMessages() {
    return this.messages$;
  }

  public async sendMessage(message: Message) {
    this.cacheService.push(message);
    this.messages.next(message);

    this.log(message.username, message.content);

    return message;
  }

  id = 0;

  private log(username: string, content: string) {
    const id = String(++this.id).padStart(4, '0');
    const time = new Date().toISOString().slice(11, 19);
    console.log(`${id} ${time} -> ${username}: ${content.slice(0, 40)}`);
  }
}
