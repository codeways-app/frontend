import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export const useActiveChatId = (): string | undefined => {
  const pathname = usePathname();

  return useMemo(() => {
    const parts = (pathname || '').split('/');
    const index = parts.indexOf('messages');
    return index !== -1 ? parts[index + 1] || undefined : undefined;
  }, [pathname]);
};
