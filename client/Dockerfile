# 1. build stage
FROM node:20-alpine AS builder
WORKDIR /app/client

# 캐시 효율을 위해 패키지 파일부터 복사
COPY ./client/package*.json ./
RUN npm ci

COPY ./client .

# 빌드 시점에 백엔드 URL 주입
# [수정] deploy.yml에서 보내는 이름(NEXT_PUBLIC_BACKEND_URL)과 맞춤
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npm run build

# 2. production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/client/.next/standalone ./
COPY --from=builder /app/client/.next/static ./.next/static


EXPOSE 3000

# 포트 설정 환경변수
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]