import { Controller, All, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @All('*')
  @HttpCode(HttpStatus.NOT_FOUND)
  handleInvalidRequests() {
    return { message: 'This route is not defined.' };
  }
}
