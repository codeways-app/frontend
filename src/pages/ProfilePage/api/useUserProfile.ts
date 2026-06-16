import { useQuery } from '@tanstack/react-query';

import { api } from '@/shared/api';

export const useUserProfile = (login: string | null) => {
  return useQuery({
    queryKey: ['user-profile', login],
    queryFn: () => api.users.getUserByLogin(login as string),
    enabled: Boolean(login),
    retry: false,
  });
};
