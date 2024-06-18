import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('Hello world request received'); // Log message
    return 'Hello World!';
  }

  handleError(error: Error) {
    this.logger.error('Error occurred:', error.stack); // Log error
  }
}
