import { MS_PER_DAY, DAYS_OF_WEEK } from '../constants';

export const formatDateOrTime = (dateString: string, t: (key: string) => string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - messageDate.getTime();
  const diffDays = Math.round(diffTime / MS_PER_DAY);

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  if (diffDays === 1) {
    return t('date.yesterday');
  }

  if (diffDays > 1 && diffDays < 7) {
    return t(`date.${DAYS_OF_WEEK[date.getDay()]}`);
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
  }

  return date.toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
