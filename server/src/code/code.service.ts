import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CodeService {
  constructor(private readonly prisma: PrismaService) {}

  async getCodeList(group_code: string) {
    const sql = `SELECT group_code, code_value, code_name
      FROM code
      WHERE group_code = '${group_code}'`;
    
    const rows = await this.prisma.$queryRawUnsafe(sql);
    return rows;
  }
}