import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

export interface Message {
  username: string
  content: string
}

@Injectable()
export class Ms2Service {
  constructor(@Inject('MS2_CLIENT') private ms2Client: ClientProxy) {}

  getMessages() {
    return this.ms2Client.send<Message>({ cmd: 'getMessages' }, {})
  }

  sendMessage(message: Message) {
    return this.ms2Client.send({ cmd: 'sendMessage' }, message)
  }
}
