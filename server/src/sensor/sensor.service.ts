import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SensorService {
  constructor(private readonly prisma: PrismaService) {}

  async getSensorList() {
    const sql = `SELECT s.sensor_id, s.sensor_code, s.group_id, c.code_name as type, s.name, s.unit, s.connect_status, s.threshold_status, s.is_active
      , DATE_FORMAT(s.created_at, '%Y-%m-%d %H:%i:%s') as created_at
      , DATE_FORMAT(s.updated_at, '%Y-%m-%d %H:%i:%s') as updated_at
      FROM sensor s
      JOIN code c ON s.type = c.code_value
      WHERE s.is_active = 1
      ORDER BY CASE WHEN s.connect_status = 'ST04' THEN 0 WHEN s.connect_status = 'ST03' THEN 1 WHEN s.connect_status = 'ST02' THEN 2 WHEN s.connect_status = 'ST01' THEN 3 END
      , CASE WHEN s.threshold_status = 'AL03' THEN 0 WHEN s.threshold_status = 'AL02' THEN 1 WHEN s.threshold_status = 'AL01' THEN 2 WHEN s.threshold_status = 'AL00' THEN 3 END
      , s.sensor_code ASC`;

    const rows = await this.prisma.$queryRawUnsafe(sql);
    return rows;
  }

  async getSensorStatusStats() {
    const sql = `SELECT connect_status, COUNT(*) as count 
      FROM sensor 
      GROUP BY connect_status`;

    const rows = await this.prisma.$queryRawUnsafe(sql);
    return rows;
  }
}
