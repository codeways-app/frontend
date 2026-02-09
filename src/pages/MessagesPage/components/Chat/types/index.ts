export type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  status: 'sent' | 'delivered' | 'read';
};

export interface ChatProps {
  chatName: string;
  additionalInfo: string;
  messages: Message[];
}
