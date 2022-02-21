import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor() {
    super('Registro já existe', HttpStatus.CONFLICT);
  }
}
