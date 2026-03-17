import { BaseSyntheticEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { SendMessageForm } from '../../../model';

export interface ChatFooterProps {
  register: UseFormRegister<SendMessageForm>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  placeholder: string;
}
