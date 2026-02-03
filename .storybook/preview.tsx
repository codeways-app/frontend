import type { Preview } from '@storybook/nextjs-vite';
import { Title, Subtitle, Description, Stories } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/internal/theming';

import { NextIntlClientProvider } from 'next-intl';
import { messagesMap, nextIntl } from './next-intl';

import '../src/shared/theme/index.css';

const preview: Preview = {
  decorators: [
    (Story, { globals: { locale = 'en' } }) => (
      <NextIntlClientProvider
        locale={locale}
        messages={messagesMap[locale as keyof typeof messagesMap] || messagesMap['en']}
      >
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  initialGlobals: {
    backgrounds: 'dark',
    locale: 'en',
    locales: {
      en: 'English',
      ru: 'Русский',
    },
  },
  parameters: {
    nextIntl,
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: {
          name: 'Dark',
          value: '#161616',
        },
        light: {
          name: 'light',
          value: '#eaeaea',
        },
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      ),
      theme: {
        ...themes.dark,
      },
    },
  },
};

export default preview;
