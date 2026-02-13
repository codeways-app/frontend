import { useAppStore } from './useAppStore';

export const useAuthUser = () => {
  const user = useAppStore((s) => s.user);

  if (!user || !user.isAuthenticated) return null;

  return user;
};
