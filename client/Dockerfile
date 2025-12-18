# 1. 빌드 단계
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. 실행 단계 (Nginx 사용)
FROM nginx:stable-alpine
# React 빌드 결과물을 Nginx 폴더로 복사
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]