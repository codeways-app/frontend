import { ComponentProps, ReactNode } from 'react';
import { LinkProps } from 'next/link';

export type ButtonVariant =
  | 'primary'
  | 'whitePrimary'
  | 'white'
  | 'gray'
  | 'transparent'
  | 'transparentPrimary'
  | 'transparentWhite'
  | 'transparentGray';

export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export type ButtonIconSide = 'start' | 'end';
export type ButtonElement = 'button' | 'a' | 'Link';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconSide?: ButtonIconSide;
  fullWidth?: boolean;
  vertical?: boolean;
  className?: string;
  children?: ReactNode;
}

interface ButtonAsButtonProps extends BaseButtonProps, ComponentProps<'button'> {
  as?: 'button';
  loading?: boolean;
}

interface ButtonAsAnchorProps extends BaseButtonProps, ComponentProps<'a'> {
  as: 'a';
}

interface ButtonAsLinkProps extends BaseButtonProps, LinkProps {
  as: 'Link';
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps | ButtonAsLinkProps;
