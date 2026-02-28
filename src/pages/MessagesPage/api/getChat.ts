import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

export const useGetChat = (id: string | null, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['chat', id],
    queryFn: () => api.chats.chatControllerGetChatById(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};
