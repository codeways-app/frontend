import { MessageDto } from '@/shared/api';

export interface ChatProps {
  chatName: string;
  additionalInfo: string;
  messages?: MessageDto[];
}
