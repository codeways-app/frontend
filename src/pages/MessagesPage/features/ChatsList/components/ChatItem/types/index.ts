import { ChatItemResponseDto } from '@/shared/api';

export interface ChatItemProps {
  chat: ChatItemResponseDto;
  isActive: boolean;
  onClick: () => void;
  isCollapsed?: boolean;
}
