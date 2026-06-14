import { MessageResponseDto } from '@/shared/api';

export const resolveFileContentType = (mimeType: string): MessageResponseDto['type'] => {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  return 'FILE';
};

const BLOCKED_FILE_EXTENSIONS = [
  'exe',
  'msi',
  'bat',
  'cmd',
  'com',
  'scr',
  'jar',
  'sh',
  'apk',
  'app',
  'dmg',
];

export const isFileTypeAllowed = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  return !BLOCKED_FILE_EXTENSIONS.includes(extension);
};
