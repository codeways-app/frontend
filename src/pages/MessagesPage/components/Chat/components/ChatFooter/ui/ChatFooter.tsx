import { Paperclip, Smile, Send } from 'lucide-react';

import { TextInput } from '@/shared/components/TextInput';
import { Button } from '@/shared/components/Button';

import { ChatFooterProps } from '../types';

import styles from './ChatFooter.module.css';

export const ChatFooter = ({ register, onSubmit, placeholder }: ChatFooterProps) => {
  return (
    <form className={styles.footer} onSubmit={onSubmit}>
      <Button variant='transparent' className={styles.button}>
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
      <Button variant='transparent' className={styles.button}>
        <Smile width={24} height={24} />
      </Button>
      <Button type='submit' variant='transparent' className={styles.button}>
        <Send width={24} height={24} />
      </Button>
    </form>
  );
};
