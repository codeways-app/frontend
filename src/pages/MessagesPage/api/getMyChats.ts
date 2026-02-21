import { useQuery } from '@tanstack/react-query';

import { api } from '@/shared/api';

export const useGetMyChats = () => {
  return useQuery({
    queryKey: ['my-chats'],
    queryFn: () => api.chats.chatControllerGetMyChats(),
  });
};
