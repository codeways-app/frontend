export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarVariant = 'image' | 'profile';

export interface AvatarProps {
  as?: AvatarVariant;
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}
