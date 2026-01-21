import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async getGroupList() {
    const sql = `SELECT group_id, group_code, name, description, is_active
      , DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
      , DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at
      FROM sensor_group
      WHERE is_active = 1`;
    
    const rows = await this.prisma.$queryRawUnsafe(sql);
    return rows;
  }
}