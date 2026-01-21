import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { GroupModule } from './group/group.module';
import { CodeModule } from './code/code.module';

@Module({
  imports: [
    SensorModule,
    GroupModule,
    CodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
