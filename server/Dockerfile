# 1. 빌드 단계
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
# prisma 스키마 파일을 먼저 복사해야 generate가 가능합니다.
COPY prisma ./prisma/ 
RUN npm install
# 빌드 시점에 클라이언트 생성 
RUN npx prisma generate --schema=./prisma/schema.prisma 
COPY . .
RUN npm run build

# 2. 실행 단계
FROM node:22-alpine
WORKDIR /app

# 빌드 결과물과 생성된 Prisma Client를 모두 복사해야 합니다.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]