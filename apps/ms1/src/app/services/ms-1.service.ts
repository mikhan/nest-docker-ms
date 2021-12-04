import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class Ms1Service {
  private readonly logger = new Logger('Ms1Service')

  accumulate(data: number[]): number {
    const value = data.reduce((a, b) => a + b)

    this.logger.log(`Accumulate: ${data.join(' + ')} = ${value}`)

    return value
  }
}
