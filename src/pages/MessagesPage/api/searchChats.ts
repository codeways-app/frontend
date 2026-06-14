'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/shared/api';
import type { ChatItemResponseDto } from '@/shared/api';

const searchChats = (q: string, signal?: AbortSignal): Promise<ChatItemResponseDto[]> =>
  api.instance.get('/api/search', { params: { q }, signal }).then((r) => r.data);

export const useSearchChats = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query.trim());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 500);
    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ['search-chats', debouncedQuery],
    queryFn: ({ signal }) => searchChats(debouncedQuery, signal),
    enabled: debouncedQuery.length >= 2,
    staleTime: 30_000,
  });
};
