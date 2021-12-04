import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { tap } from 'rxjs/operators'

@Injectable()
export class Ms1Service {
  private readonly logger = new Logger('MS1_CLIENT')

  constructor(@Inject('MS1_CLIENT') private ms1Client: ClientProxy) {}

  accumulate(payload: number[]) {
    const pattern = { cmd: 'accumulate' }
    return this.ms1Client
      .send<number>(pattern, payload)
      .pipe(tap((msg) => this.logger.log('accumulate', msg)))
  }
}
