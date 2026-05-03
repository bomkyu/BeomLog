# 1. 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 설치 (캐싱 활용)
COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2. 실행 스테이지
FROM node:20-alpine AS runner
WORKDIR /app

# 프로덕션 환경 변수 설정
ENV NODE_ENV=production

# 빌드 결과물과 실행에 필요한 패키지만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 포트 설정
EXPOSE 4000

# 빌드된 js 파일 직접 실행 
CMD ["node", "dist/main"]