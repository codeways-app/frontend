import { SendMessageDto } from '@/shared/api';

export const DEFAULT_SEND_MESSAGE_VALUE: SendMessageDto = {
  chatId: '',
  userId: '',
  message: {
    content: '',
    type: 'TEXT',
    replyToId: '',
  },
};
