'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('인증 체크 중 오류 발생:', error);
        setIsAdmin(false);
      }
    };

    checkAdminSession();
  }, [setIsAdmin]);

  return <>{children}</>;
};

export default AuthProvider;
