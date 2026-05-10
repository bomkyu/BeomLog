# 🚀 BeomLog (Full-Stack Blog Platform)

> **3년의 솔루션 개발 실무 경험과 최신 웹 트렌드를 결합하여 구축한 1인 풀스택 프로젝트입니다.**
> iwinv 가상 서버(VPS) 환경에서 인프라 설계부터 보안 최적화까지 전 과정을 직접 핸들링하며 실무 복귀를 위해 개발되었습니다.

---

## 🌐 Service Links

> **Live Service**: [🔒 https://beomlog.dev](https://beomlog.dev)

_Cloudflare WAF 및 SSL 보안이 적용된 환경에서 iwinv VPS를 통해 안정적으로 운영 중입니다._

---

### 1. 👥 팀 소개 (Team)

- **서범규 (Seo Beom-gyu)**: Full-Stack Developer
  - 2018~2021 솔루션 개발 실무 경험 기반의 안정적인 시스템 설계 지향
  - 프론트엔드/백엔드 개발 및 가상 서버 인프라 구축·운영 1인 수행

### 2. 📝 프로젝트 소개 (Project)

단순한 기록용 블로그를 넘어, 상용 서비스 수준의 안정성과 보안을 확보하는 것을 목표로 제작되었습니다.

- **주요 기능**: 마크다운 기반 게시글 CRUD, 관리자 세션 인증, Swagger API 문서화, 실시간 트래픽 분석 및 봇 차단.
- **특이사항**: iwinv 가상 서버를 활용한 고정 IP 환경 운영 및 Docker를 통한 서비스 환경 규격화.

### 3. 🏗 아키텍처 (Architecture)

시스템의 흐름과 인프라 구성을 한눈에 볼 수 있도록 설계되었습니다.

- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4
- **Backend**: NestJS (v11), TypeORM
- **Database**: MySQL 8.0
- **Infrastructure**:
  - **Server**: iwinv Cloud VPS (Ubuntu 기반)
  - **Proxy**: Nginx (Reverse Proxy)
  - **Container**: Docker & Docker Compose
  - **CI/CD**: GitHub Actions
  - **Network**: Cloudflare (DNS, WAF, SSL 적용)

### 4. 📄 API 명세서 (API Specification)

본 프로젝트는 **Swagger**를 통해 모든 API를 문서화하여 개발 가시성을 확보했습니다.

- **Swagger UI**: [https://beomlog.dev/api-docs](https://localhost:4000/api)
- **주요 엔드포인트**:
  - `POST /api/auth/login`: 관리자 세션 발급 및 인증
  - `GET /api/posts`: 게시글 목록 조회 (검색 및 페이징)
  - `POST /api/posts`: 게시글 생성 (세션 기반 권한 체크)
  - `POST /api/uploads`: Multer를 활용한 이미지 서버 저장 및 경로 반환

### 5. 🔑 환경 변수 (Environment Variables)

프로젝트 구동을 위해 필요한 주요 설정값입니다. 보안을 위해 `.env` 파일은 별도 관리하며, 아래는 참고용 템플릿입니다.

```env
# Database 설정 (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=beomlog

# Backend 설정 (NestJS)
BACKEND_PORT=4000
NODE_ENV=production

# Network & Communication
# [Server-to-Server] Next.js 서버 컴포넌트 전용 내부 통신 주소
BACKEND_INTERNAL_URL=http://localhost:4000

# [Client-to-Server] 브라우저 런타임 전용 외부 통신 주소 (사용자 직접 API 요청용)
NEXT_PUBLIC_BACKEND_URL=[http://localhost:4000/api](http://localhost:4000/api)
NEXT_PUBLIC_FRONTEND_URL=[http://localhost:3000/api](http://localhost:3000/api)

# 이미지/파일용 (Static Assets - Nginx 서빙 경로)
NEXT_PUBLIC_RESOURCE_URL=[http://localhost:4000](http://localhost:4000)

# Security & Auth
SESSION_SECRET=your_complex_secret_key
ADMIN_PASSWORD=your_admin_password
```
