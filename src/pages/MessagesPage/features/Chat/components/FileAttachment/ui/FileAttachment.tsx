import { FileText, Image, Video, Music, Archive, AppWindow, Download } from 'lucide-react';

import { API_BASE_URL } from '@/shared/api';
import { Text } from '@/shared/components/Text';
import { formatFileSize } from '@/shared/lib/file';

import { FileAttachmentProps } from '../types';

import styles from './FileAttachment.module.css';

const ICONS: Record<string, typeof FileText> = {
  IMAGE: Image,
  VIDEO: Video,
  FILE: FileText,
  TEXT: FileText,
};

const EXECUTABLE_EXTENSIONS = ['exe', 'msi', 'apk', 'app', 'dmg', 'bat', 'cmd', 'sh'];
const ARCHIVE_EXTENSIONS = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];

const getExtension = (fileName: string) => fileName.split('.').pop()?.toLowerCase() ?? '';

const resolveIcon = (type: FileAttachmentProps['type'], fileName: string, mimeType?: string) => {
  if (mimeType?.startsWith('audio/')) return Music;

  const extension = getExtension(fileName);
  if (EXECUTABLE_EXTENSIONS.includes(extension)) return AppWindow;
  if (ARCHIVE_EXTENSIONS.includes(extension)) return Archive;

  return ICONS[type] ?? FileText;
};

export const FileAttachment = ({ type, fileName, fileSize, fileUrl, mimeType }: FileAttachmentProps) => {
  const Icon = resolveIcon(type, fileName, mimeType);

  return (
    <a
      className={styles.attachment}
      href={fileUrl ? `${API_BASE_URL}${fileUrl}` : undefined}
      download={fileName}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon className={styles.icon} />
      <div className={styles.info}>
        <Text variant='text1' className={styles.fileName}>
          {fileName}
        </Text>
        {fileSize !== undefined && <Text variant='caption'>{formatFileSize(fileSize)}</Text>}
      </div>
      <Download className={styles.downloadIcon} />
    </a>
  );
};
