import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { TextInput } from '@/shared/components/TextInput';
import { Button } from '@/shared/components/Button';

import { Search, X } from 'lucide-react';

import { useChatListFilters } from '../hooks';
import type { ChatFiltersProps } from '../types';

import styles from './ChatFilters.module.css';

export const ChatFilters = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  isCollapsed,
  onExpand,
}: ChatFiltersProps) => {
  const t = useTranslations('messages.chatsList');
  const filters = useChatListFilters(onFilterChange);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed]);

  return (
    <div className={styles.searchWrapper}>
      {isCollapsed ? (
        <Button
          className={styles.collapsedSearch}
          onClick={onExpand}
          type='button'
          icon={<Search className={styles.searchIcon} />}
        />
      ) : (
        <>
          <TextInput
            ref={inputRef}
            className={styles.search}
            inputSize='sm'
            placeholder={t('textInput.placeholder')}
            label={t('textInput.placeholder')}
            hideLabel
            endIcon={
              searchQuery ? (
                <button
                  type='button'
                  className={styles.clearSearch}
                  onClick={() => onSearchChange('')}
                  aria-label={t('textInput.clear')}
                >
                  <X width={14} height={14} />
                </button>
              ) : (
                <Search width={10} height={10} />
              )
            }
            noBorder
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <ul className={styles.filters}>
            {filters.map((item) => (
              <li key={item.key}>
                <Button
                  size='xs'
                  variant={filter === item.key ? 'primary' : 'transparentWhite'}
                  onClick={item.handler}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
