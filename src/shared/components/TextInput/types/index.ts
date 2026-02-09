import { ComponentProps, ReactNode, Ref } from 'react';

export type TextInputType = 'text' | 'email' | 'tel' | 'search' | 'url' | 'number' | 'password';

export interface TextInputProps extends ComponentProps<'input'> {
  type?: TextInputType;
  label: string;
  hideLabel?: boolean;
  hint?: string;
  endIcon?: ReactNode;
  invalid?: boolean;
  noBorder?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}
