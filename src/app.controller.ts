import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Class that with no route.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
