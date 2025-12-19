import { Body, Controller } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { SensorService } from "./sensor.service";

@Controller('api/sensor')
export class SensorController {
    constructor(private readonly sensorService: SensorService) {}

    @Post('getSensorList')
    getSensorList(@Body() body: any) {
        const sensorList = this.sensorService.getSensorList();
        return sensorList;
    }
}
