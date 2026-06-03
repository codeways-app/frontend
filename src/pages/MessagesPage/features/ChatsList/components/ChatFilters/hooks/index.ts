import { useTranslations } from 'next-intl';

export const useChatListFilters = (onFilterChange: (filter: string) => void) => {
  const t = useTranslations('messages.chatsList');

  const handleFilterAll = () => onFilterChange('all');
  const handleFilterUnread = () => onFilterChange('unread');
  const handleFilterGroups = () => onFilterChange('groups');

  return [
    { key: 'all', label: t('filters.all'), handler: handleFilterAll },
    { key: 'unread', label: t('filters.unread'), handler: handleFilterUnread },
    { key: 'groups', label: t('filters.groups'), handler: handleFilterGroups },
  ];
};
