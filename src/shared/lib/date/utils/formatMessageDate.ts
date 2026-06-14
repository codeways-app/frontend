import { MS_PER_DAY } from '../constants';

export const formatMessageDate = (
  dateString: string,
  locale: string,
  t: (key: string) => string,
): string => {
  const date = new Date(dateString);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - messageDate.getTime();
  const diffDays = Math.round(diffTime / MS_PER_DAY);

  if (diffDays === 0) {
    return t('today');
  }

  if (diffDays === 1) {
    return t('yesterday');
  }

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
  });
};
