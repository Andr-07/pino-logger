import * as ecsFormat from '@elastic/ecs-pino-format';
import { Module, OnModuleInit } from '@nestjs/common';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      useExisting: true,
      pinoHttp: {
        ...ecsFormat(),
        prettyPrint:{
                colorize: true,
                levelFirst: true,
                singleLine: true,
       },
     }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
  ) {
  }

  async onModuleInit(): Promise<void> {
    this.logger.setContext('AppModule.onModuleInit');

    this.logger.trace(`this log is not working`);
    this.logger.info(`it works fine`);
  }
}