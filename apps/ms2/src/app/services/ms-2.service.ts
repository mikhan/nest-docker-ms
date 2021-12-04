import { Injectable, Logger } from '@nestjs/common'
import { tap, ReplaySubject } from 'rxjs'

export interface Message {
  username: string
  content: string
}

@Injectable()
export class Ms2Service {
  private readonly logger = new Logger('Ms2Service')

  private messages = new ReplaySubject<Message>(50)
  public messages$ = this.messages.asObservable()

  constructor() {
    this.messages$.pipe(
      tap(({ username, content }) => this.log(username, content)),
    )
  }

  public getMessages() {
    return this.messages$
  }

  public sendMessage(message: Message) {
    this.messages.next(message)

    this.log(message.username, message.content)

    return message
  }

  number = 0

  private log(username: string, content: string) {
    const id = String(++this.number).padStart(4, '0')
    const time = new Date().toISOString().slice(11, 19)
    console.log(`${id} ${time} -> ${username}: ${content.slice(0, 40)}`)
  }
}
