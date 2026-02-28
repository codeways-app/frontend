import { AVATAR_COLORS, AVATAR_DEFAULT_COLOR } from '../constants';

export const getAvatarFallback = (name?: string) => {
  if (!name) return '?';
  return name.trim()[0].toUpperCase();
};

export const getAvatarColor = (name?: string) => {
  if (!name) return AVATAR_DEFAULT_COLOR;

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};
