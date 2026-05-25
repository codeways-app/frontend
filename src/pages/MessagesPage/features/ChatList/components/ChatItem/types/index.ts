import { ChatItemDto } from '@/shared/api';

export interface ChatItemProps {
  chat: ChatItemDto;
  isActive: boolean;
  onClick: () => void;
  isCollapsed?: boolean;
}
