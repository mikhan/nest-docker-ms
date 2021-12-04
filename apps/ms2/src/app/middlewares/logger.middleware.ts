import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request')

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url } = request

    response.on('close', () =>
      this.logger.log(`${method} ${url} ${response.statusCode}`),
    )

    next()
  }
}
