export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarVariant = 'image' | 'profile';

export interface AvatarProps {
  as?: AvatarVariant;
  href?: string;
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}
