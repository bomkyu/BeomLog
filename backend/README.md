# BeomLog Backend

BeomLog의 백엔드 API 서버입니다. NestJS와 TypeORM 기반으로 블로그 게시글, 카테고리, 태그, 이미지 업로드, 관리자 인증 기능을 제공합니다.

## 기술 스택

- NestJS 11
- TypeScript
- TypeORM
- MySQL 8
- Express Session
- Multer
- Swagger
- Jest

## 주요 기능

- 게시글 목록/상세 조회
- 게시글 작성, 수정, 삭제
- 카테고리 조회 및 생성
- 태그 엔티티 관리
- 이미지 파일 업로드 및 정적 파일 서빙
- 관리자 로그인/로그아웃/세션 확인
- Swagger API 문서 제공

## 프로젝트 구조

```text
src
├── auth          # 관리자 로그인, 세션, 가드
├── categories    # 카테고리 API
├── comments      # 댓글 엔티티
├── images        # 게시글 이미지 엔티티
├── posts         # 게시글 API
├── tags          # 태그 엔티티/서비스
├── app.module.ts # 루트 모듈 및 TypeORM 설정
└── main.ts       # 서버 부트스트랩, CORS, Swagger, 정적 파일 설정
```

## 환경 변수

프로젝트 루트 또는 `backend/.env`에 아래 값을 설정합니다.

```env
PORT=4000
BACKEND_PORT=4000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=beomlog

ADMIN_PASSWORD=admin-password
SESSION_SECRET=session-secret
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
```

- `PORT`: Nest 서버 실행 포트
- `BACKEND_PORT`: Docker compose에서 노출할 백엔드 포트
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: MySQL 접속 정보
- `ADMIN_PASSWORD`: 관리자 로그인 비밀번호
- `SESSION_SECRET`: 세션 쿠키 서명 키
- `NEXT_PUBLIC_BACKEND_URL`: 업로드 이미지 URL 생성에 사용되는 공개 백엔드 주소

## 로컬 실행

```bash
npm install
npm run start:dev
```

기본 포트는 `4000`입니다. API에는 전역 prefix `api`가 적용됩니다.

```text
http://localhost:4000/api
```

## Docker 개발 실행

루트 디렉터리에서 실행합니다.

```bash
docker compose up --build
```

구성되는 서비스:

- `beomlog-frontend`: Next.js 개발 서버
- `beomlog-backend`: NestJS API 서버
- `beomlog-mysql`: MySQL 8 데이터베이스

업로드 파일은 루트의 `uploads` 디렉터리에 저장되고, 컨테이너 내부 `/app/uploads`에 마운트됩니다.

## 스크립트

```bash
npm run start       # 서버 실행
npm run start:dev   # watch 모드 개발 서버
npm run build       # Nest 빌드
npm run start:prod  # dist/main 실행
npm run lint        # ESLint 자동 수정
npm run format      # Prettier 포맷
npm run test        # 유닛 테스트
npm run test:e2e    # e2e 테스트
npm run test:cov    # 테스트 커버리지
```

## API 문서

서버 실행 후 Swagger 문서는 아래 주소에서 확인할 수 있습니다.

```text
http://localhost:4000/api
```

## 주요 API

백엔드는 `main.ts`에서 `app.setGlobalPrefix('api')`를 사용하므로 모든 경로 앞에 `/api`가 붙습니다.

### Auth

- `POST /api/auth/login`: 관리자 로그인
- `POST /api/auth/logout`: 관리자 로그아웃
- `GET /api/auth/check`: 관리자 세션 확인

### Posts

- `GET /api/posts`: 게시글 목록 조회
- `GET /api/posts/:id`: 게시글 상세 조회
- `POST /api/posts`: 게시글 작성, 관리자 세션 필요
- `PATCH /api/posts/:id`: 게시글 수정, 관리자 세션 필요
- `DELETE /api/posts/:id`: 게시글 삭제, 관리자 세션 필요
- `POST /api/posts/upload`: 이미지 업로드, 관리자 세션 필요

### Categories

- `GET /api/categories`: 카테고리 목록 조회
- `POST /api/categories`: 카테고리 생성
