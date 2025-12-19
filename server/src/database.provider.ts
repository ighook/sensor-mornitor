import { Module, Global } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return await mysql.createPool({
          host: '13.125.254.58',
          user: 'ighook',
          password: 'fkfmskzk01!',
          database: 'sensor_monitor',
          waitForConnections: true,
          connectionLimit: 10,
        });
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'], // 이걸 내보내야 SensorService에서 씁니다.
})
export class DatabaseModule {}