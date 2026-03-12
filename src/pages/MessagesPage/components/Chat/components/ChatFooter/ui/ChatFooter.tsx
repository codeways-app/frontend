import { Paperclip, Smile, Send } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { TextInput } from '@/shared/components/TextInput';
import { Button } from '@/shared/components/Button';

import { ChatFooterProps } from '../types';

import styles from './ChatFooter.module.css';
import { useState } from 'react';

export const ChatFooter = ({
  register,
  onSubmit,
  placeholder,
  setValue,
  getValues,
}: ChatFooterProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    const current = getValues('content') || '';
    setValue('content', current + emoji.native);
  };

  return (
    <form className={styles.footer} onSubmit={onSubmit}>
      <Button variant='transparent' aria-label='Attachment' className={styles.button}>
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
      <div className={styles.emojiContainer}>
        {showEmojiPicker && (
          <div className={styles.emojiPicker}>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              previewPosition='none'
              searchPosition='none'
              emojiSize={18}
              perLine={7}
            />
          </div>
        )}
        <Button
          type='button'
          variant='transparent'
          aria-label='Emoji'
          className={styles.button}
          icon={<Smile width={24} height={24} />}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
      </div>
      <Button type='submit' variant='transparent' aria-label='Send' className={styles.button}>
        <Send width={24} height={24} />
      </Button>
    </form>
  );
};
