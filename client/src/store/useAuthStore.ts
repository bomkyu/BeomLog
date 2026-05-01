import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isHydrated: boolean;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      isHydrated: false,
      setIsAdmin: (value) => set({ isAdmin: value }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // 로컬 스토리지 복구가 끝나면 true로 변경
      },
    }
  )
);
