import { BaseSyntheticEvent } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';

import { SendMessageForm } from '../../../model';

export interface ChatFooterProps {
  register: UseFormRegister<SendMessageForm>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  placeholder: string;
  setValue: UseFormSetValue<SendMessageForm>;
  getValues: UseFormGetValues<SendMessageForm>;
}
