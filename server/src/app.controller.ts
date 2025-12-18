import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test2')
  getTest2(): string {
    return 'test2';
  }

  @Post('test')
  postTest(@Body() body: any): string {
    console.log(body);
    return 'test';
  }
}
