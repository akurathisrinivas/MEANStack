import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi srinvas Welcome to DBMCI!';
  }
}
