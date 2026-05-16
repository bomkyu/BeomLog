# BeomLog Frontend

BeomLog의 프론트엔드 애플리케이션입니다. 포트폴리오 페이지와 기술 블로그 페이지를 제공하며, Next.js App Router 기반으로 구성되어 있습니다.

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Tiptap Editor
- React Hook Form
- Zustand
- Lucide React

## 주요 기능

- 포트폴리오 메인 페이지
- 블로그 게시글 목록, 상세, 작성, 수정 페이지
- 카테고리 필터와 페이지네이션
- 관리자 인증 상태 기반 글 작성/수정/삭제 UI
- Tiptap 기반 게시글 에디터
- 이미지 업로드 및 썸네일 표시
- 카드/상세 페이지 로딩 스켈레톤
- 이미지 로딩 중 썸네일 스켈레톤

## 프로젝트 구조

```text
src/app
├── (portfolio)              # 포트폴리오 라우트
├── (blog)                   # 블로그 라우트
│   ├── blog                 # 게시글 목록, 상세, 작성, 수정
│   └── components           # 블로그 전용 컴포넌트
├── component                # 공통 UI 컴포넌트
├── lib                      # API, 유틸 함수
├── globals.css              # 전역 스타일 및 Tailwind theme
├── layout.tsx               # 루트 레이아웃
└── sitemap.ts               # 사이트맵
```

## 환경 변수

프로젝트 루트의 `.env` 또는 배포 환경에 아래 값을 설정합니다.

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
BACKEND_INTERNAL_URL=http://backend:4000/api
NEXT_PUBLIC_RESOURCE_URL=http://localhost:4000/api
```

- `NEXT_PUBLIC_BACKEND_URL`: 브라우저에서 접근하는 백엔드 API 주소
- `BACKEND_INTERNAL_URL`: 서버 컴포넌트가 Docker 내부 네트워크에서 접근하는 API 주소
- `NEXT_PUBLIC_RESOURCE_URL`: 이미지 리소스 접근용 주소

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## Docker 개발 실행

루트 디렉터리에서 실행합니다.

```bash
docker compose up --build
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## API 연동

프론트엔드는 `src/app/lib/api.ts`를 통해 백엔드와 통신합니다.

- 게시글 목록: `GET /posts`
- 게시글 상세: `GET /posts/:id`
- 카테고리 목록: `GET /categories`
- 게시글 작성/수정/삭제: 관리자 세션 필요
- 이미지 업로드: `POST /posts/upload`

백엔드에는 전역 prefix `api`가 적용되어 있으므로 실제 요청 경로는 `/api/posts`, `/api/categories` 형태입니다.
