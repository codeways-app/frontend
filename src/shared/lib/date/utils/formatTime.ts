export const formatTime = (dateString: string, locale: string): string => {
  const date = new Date(dateString);

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  });
};
