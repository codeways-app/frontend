import { useRef } from 'react';

import { Paperclip, Smile, Send } from 'lucide-react';

import { TextInput } from '@/shared/components/TextInput';
import { Button } from '@/shared/components/Button';

import { ChatFooterProps } from '../types';

import styles from './ChatFooter.module.css';

export const ChatFooter = ({ register, onSubmit, onFileSelect, placeholder }: ChatFooterProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    e.target.value = '';
  };

  return (
    <form className={styles.footer} onSubmit={onSubmit}>
      <input
        ref={fileInputRef}
        type='file'
        className={styles.fileInput}
        onChange={handleFileChange}
      />
      <Button
        type='button'
        variant='transparent'
        aria-label='Attachment'
        className={styles.button}
        onClick={() => fileInputRef.current?.click()}
      >
        <Paperclip />
      </Button>
      <TextInput
        className={styles.input}
        placeholder={placeholder}
        label={placeholder}
        hideLabel
        noBorder
        {...register('content')}
      />
      <Button type='button' variant='transparent' aria-label='Emoji' className={styles.button}>
        <Smile width={24} height={24} />
      </Button>
      <Button type='submit' variant='transparent' aria-label='Send' className={styles.button}>
        <Send width={24} height={24} />
      </Button>
    </form>
  );
};
