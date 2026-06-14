'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import NProgress from 'nprogress';

import { routing } from '@/shared/configs/i18n';

import 'nprogress/nprogress.css';
import './TopLoader.module.css';

NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  trickleSpeed: 150,
});

// Strip a leading locale segment (e.g. "/en/messages" -> "/messages") so links
// without an explicit locale prefix can be compared against the current URL.
const stripLocale = (pathname: string): string => {
  const [, maybeLocale, ...rest] = pathname.split('/');
  if ((routing.locales as readonly string[]).includes(maybeLocale)) {
    return `/${rest.join('/')}`;
  }
  return pathname;
};

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a');

      if (!target || !target.href) return;
      if (target.target === '_blank') return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      const targetUrl = new URL(target.href);
      const currentUrl = new URL(window.location.href);

      if (targetUrl.origin !== currentUrl.origin) return;

      if (
        stripLocale(targetUrl.pathname) === stripLocale(currentUrl.pathname) &&
        targetUrl.search === currentUrl.search
      ) {
        return;
      }

      NProgress.start();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
