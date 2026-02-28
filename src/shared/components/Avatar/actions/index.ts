export const getAvatarFallback = (name?: string) => {
  if (!name) return '?';
  return name.trim()[0].toUpperCase();
};
