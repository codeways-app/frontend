import { MessageResponseDto } from '@/shared/api';

export interface FileAttachmentProps {
  type: MessageResponseDto['type'];
  fileName: string;
  fileSize?: number;
  fileUrl?: string;
  mimeType?: string;
}
