'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import './TopLoader.module.css';

NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  trickleSpeed: 150,
});

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

      if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
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
