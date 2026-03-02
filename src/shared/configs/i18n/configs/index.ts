import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { DEFAULT_LOCALE } from '../constants';
import { routing } from '../lib';
import { Messages } from '../types';

import deepmerge from 'deepmerge';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : DEFAULT_LOCALE;

  const defaultMessage = (await import(`../../../assets/locales/${DEFAULT_LOCALE}.json`)).default;
  const localeMessage = (await import(`../../../assets/locales/${locale}.json`)).default;

  const mergedMessage = deepmerge(defaultMessage, localeMessage) as Messages;

  return {
    locale,
    messages: {
      ...mergedMessage,
      ...((mergedMessage.translation as Messages) || {}),
    },
  };
});
