import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices'

@Injectable()
export class ConfigService {
  api = {
    transport: Transport.TCP,
    options: {
      host: process.env.API_HOST ?? 'localhost',
      port: Number(process.env.API_PORT ?? '3000'),
    },
  } as const;

  ms1 = {
    transport: Transport.TCP,
    options: {
      host: process.env.MS1_HOST ?? 'localhost',
      port: Number(process.env.MS1_PORT ?? '3001'),
    },
  } as const;

  ms2 = {
    transport: Transport.TCP,
    options: {
      host: process.env.MS2_HOST ?? 'localhost',
      port: Number(process.env.MS2_PORT ?? '3002'),
    },
  } as const;
}
