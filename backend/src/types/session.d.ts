import 'express-session';

declare module 'express-session' {
  interface SessionData {
    admin: {
      isLoggedIn: boolean;
      user: string;
    };
    viewedPostIds?: number[];
  }
}
