import { Controller, Body } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { Ms2Service, Message } from '../services/ms-2.service'

@Controller()
export class Ms2Controller {
  constructor(private readonly ms2Service: Ms2Service) {}

  @MessagePattern({ cmd: 'getMessages' })
  getMessages() {
    return this.ms2Service.getMessages()
  }

  @MessagePattern({ cmd: 'sendMessage' })
  sendMessage(@Body() message: Message) {
    return this.ms2Service.sendMessage(message)
  }
}
