import { z } from 'zod';

export const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message is required'),
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'FILE']),
  replyToId: z.string().optional(),
});

export type SendMessageForm = z.infer<typeof sendMessageSchema>;
