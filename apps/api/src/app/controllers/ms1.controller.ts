import { Controller, Get, Query } from '@nestjs/common'
import { Ms1Service } from '../services/ms1.service'

@Controller('ms1')
export class Ms1Controller {
  constructor(private readonly ms1Service: Ms1Service) {}

  @Get('accumulate')
  accumulate(@Query('values') values: string) {
    const numbers = values.split(',').map((s) => Number(s))
    return this.ms1Service.accumulate(numbers)
  }
}
