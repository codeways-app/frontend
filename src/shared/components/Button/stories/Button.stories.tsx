import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DEFAULT_ICON_SIDE, DEFAULT_SIZE } from '../constants';
import { Button } from '../ui';

import { Loader, Loader2, LogIn } from 'lucide-react';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'select', options: ['button', 'a', 'Link'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    icon: {
      control: { type: 'select' },
      options: ['LogIn', 'Loader', 'Loader2'],
      mapping: {
        LogIn: <LogIn />,
        Loader: <Loader />,
        Loader2: <Loader2 />,
      },
    },
    iconSide: { control: 'select', options: ['start', 'end'] },
    loading: { control: 'boolean', if: { arg: 'as', eq: 'button' } },
    disabled: { control: 'boolean', if: { arg: 'as', eq: 'button' } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    as: 'button',
    size: DEFAULT_SIZE,
    iconSide: DEFAULT_ICON_SIDE,
    fullWidth: false,
    loading: false,
    disabled: false,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    as: 'button',
    loading: true,
  },
};

export const With_Icon: Story = {
  args: {
    children: 'Sign In',
    size: 'md',
    icon: <LogIn />,
    iconSide: 'end',
  },
};

export const WhitePrimary: Story = {
  args: {
    variant: 'white',
    children: 'Button',
  },
};

export const TransparentPrimary: Story = {
  args: {
    variant: 'transparentPrimary',
    children: 'Button',
  },
};

export const TransparentWhite: Story = {
  args: {
    variant: 'transparentWhite',
    children: 'Button',
  },
};

export const TransparentGray: Story = {
  args: {
    variant: 'transparentGray',
    children: 'Button',
  },
};
