import { MessageResponseDto } from '@/shared/api';
import { User } from '@/shared/stores/app/types';

export interface ChatMessageListProps {
  messages: MessageResponseDto[];
  user: User | null;
  selectedChat: string | null;
  isGroup: boolean;
}
