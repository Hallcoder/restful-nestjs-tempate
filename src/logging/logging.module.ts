import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import * as  path from 'path';
import pino from 'pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // prettyPrint: true,
        // logger: pino(pino.destination(path.join(__dirname, 'logs/app.log'))),
      },
    }),
  ],
  exports: [LoggerModule],
})
export class LoggingModule {}
