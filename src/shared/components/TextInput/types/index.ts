import { ComponentProps, ReactNode, Ref } from 'react';

export type TextInputType = 'text' | 'email' | 'tel' | 'search' | 'url' | 'number' | 'password';
export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps extends ComponentProps<'input'> {
  type?: TextInputType;
  inputSize?: TextInputSize;
  label: string;
  hideLabel?: boolean;
  hint?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  invalid?: boolean;
  noBorder?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}
