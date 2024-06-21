import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  @Get('loggerTest')
  async loggerTest() {
    await this.logger.debug('Debug message');
    await this.logger.log('Info message');
    await this.logger.warn('Warning message');
    await this.logger.error('Error message');
    return { message: 'Logging test completed' };
  }
}
