import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { Ms1Service } from '../services/ms-1.service'

@Controller()
export class Ms1Controller {
  constructor(private readonly ms1Service: Ms1Service) {}

  @MessagePattern({ cmd: 'accumulate' })
  accumulate(data: number[]): number {
    return this.ms1Service.accumulate(data)
  }
}
