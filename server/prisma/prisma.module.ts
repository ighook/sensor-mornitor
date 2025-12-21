import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Global() // ← 있으면 App 전역에서 사용 가능
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ★ 핵심
})
export class PrismaModule {}
