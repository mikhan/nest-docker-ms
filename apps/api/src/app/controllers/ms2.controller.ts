import {
  Controller,
  Get,
  Post,
  Render,
  Body,
  Sse,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { finalize, map, tap } from 'rxjs';
import { Ms2Service, Message } from '../services/ms2.service';

@Controller('ms2')
export class Ms2Controller {
  private readonly logger = new Logger('Ms2Controller');
  constructor(private readonly ms2Service: Ms2Service) {}

  @Get()
  @Render('ms2')
  get() {
    return {};
  }

  @Get('chat/:username')
  @Render('chat')
  getChat(@Param('username') username: string, @Query('init') init: unknown) {
    init = typeof init !== 'undefined';
    this.logger.log(`Username: ${username}, init=${init}`);

    return { username, init };
  }

  stream = 0;

  @Sse('subscription')
  messages() {
    const stream = `[${String(++this.stream).padStart(2, '0')}]`;
    this.logger.log(`getMessages`);

    return this.ms2Service.getMessages().pipe(
      tap(({ username, content }) => this.log(username, content, stream)),
      map((data) => ({ data })),
      finalize(() => console.log(`${stream} client is disconnected`))
    );
  }

  @Post('messages')
  message(@Body() message: Message) {
    this.logger.log(`sendMessage -> ${message.username}: ${message.content}`);

    return this.ms2Service.sendMessage(message);
  }

  number = 0;

  private log(username: string, content: string, stream: string) {
    const id = String(++this.number).padStart(4, '0');
    const time = new Date().toISOString().slice(11, 19);
    console.log(
      `${stream} ${id} ${time} -> ${username}: ${content.slice(0, 40)}`
    );
  }
}
