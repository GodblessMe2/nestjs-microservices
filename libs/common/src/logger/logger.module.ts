import { Module } from '@nestjs/common';
import { LoggerModule as pinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    pinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }
    }),
  ],
})
export class LoggerModule {}
