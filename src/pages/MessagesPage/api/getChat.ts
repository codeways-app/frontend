import { useQuery } from '@tanstack/react-query';

import { api } from '@/shared/api';

export const useGetChat = (id: string | undefined) => {
  return useQuery({
    queryKey: ['chat', id],
    queryFn: () => api.chats.chatControllerGetChatById(id!),
    enabled: !!id,
  });
};
