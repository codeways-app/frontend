import { ChatProps } from '../components/Chat/types';
import { ChatType } from '../components/ChatList/types';

export const chats: ChatType[] = [
  {
    id: 1,
    name: 'chat_name',
    lastMessage: {
      text: 'last_message',
      createdAt: '12:00',
      senderId: '0',
      status: 'delivered',
    },
    unreadCount: 3,
  },
];

export const chat: ChatProps = {
  chatName: 'chat_name',
  additionalInfo: 'additional_info',
  messages: [
    {
      id: '1',
      text: 'Hello! How are you?',
      senderId: '1',
      createdAt: '12:00',
      status: 'sent',
    },
    {
      id: '2',
      text: "I'm fine, thanks! And you?",
      senderId: '0',
      createdAt: '12:01',
      status: 'read',
    },
  ],
};
