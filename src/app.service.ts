import { Injectable } from '@nestjs/common';
/**
 * Class to connect to users
 */
@Injectable()
export class AppService {
  /**
   * method
   */
  getHello(): string {
    return 'Hello World From Nestjs!';
  }
}
