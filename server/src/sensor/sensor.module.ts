import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';

@Module({
  imports: [],
  providers: [SensorService],
  controllers: [SensorController],
})
export class SensorModule {}