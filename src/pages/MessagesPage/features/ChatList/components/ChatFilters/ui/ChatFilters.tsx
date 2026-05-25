import { useTranslations } from 'next-intl';

import { TextInput } from '@/shared/components/TextInput';
import { Button } from '@/shared/components/Button';

import { Search } from 'lucide-react';

import { useChatListFilters } from '../hooks';
import type { ChatFiltersProps } from '../types';

import styles from './ChatFilters.module.css';

export const ChatFilters = ({ filter, onFilterChange, isCollapsed }: ChatFiltersProps) => {
  const t = useTranslations('messages.chatsList');
  const filters = useChatListFilters(onFilterChange);

  return (
    <div className={styles.searchWrapper}>
      {isCollapsed ? (
        <div className={styles.collapsedSearch}>
          <Search width={24} height={24} className={styles.searchIcon} />
        </div>
      ) : (
        <>
          <TextInput
            className={styles.search}
            inputSize='sm'
            placeholder={t('textInput.placeholder')}
            label={t('textInput.placeholder')}
            hideLabel
            endIcon={<Search width={10} height={10} />}
            noBorder
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
