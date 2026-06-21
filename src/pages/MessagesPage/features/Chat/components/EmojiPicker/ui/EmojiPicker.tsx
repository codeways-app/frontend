import { EMOJIS } from '../constants';
import { EmojiPickerProps } from '../types';

import styles from './EmojiPicker.module.css';

export const EmojiPicker = ({ onSelect, onClose }: EmojiPickerProps) => (
  <div className={styles.picker} onMouseLeave={onClose}>
    <div className={styles.grid}>
      {EMOJIS.map((emoji, i) => (
        <button
          key={i}
          type='button'
          className={styles.emoji}
          onClick={() => onSelect(emoji)}
          title={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  </div>
);
