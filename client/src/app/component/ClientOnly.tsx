'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!isMounted || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
