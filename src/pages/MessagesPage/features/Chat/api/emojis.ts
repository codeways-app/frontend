import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { publicApi } from '@/shared/api';

export interface EmojiDto {
  id: string;
  name: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
}

const EMOJIS_KEY = ['custom-emojis'];

export const useGetEmojis = () =>
  useQuery<EmojiDto[]>({
    queryKey: EMOJIS_KEY,
    queryFn: () =>
      publicApi.instance.get<EmojiDto[]>('/emojis').then((r) => r.data),
  });

export const useUploadEmoji = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ file, name }: { file: File; name: string }) => {
      const form = new FormData();
      form.append('file', file);
      form.append('name', name);
      return publicApi.instance
        .post<EmojiDto>('/emojis', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data);
    },
    onSuccess: (emoji) => {
      qc.setQueryData<EmojiDto[]>(EMOJIS_KEY, (prev) =>
        prev ? [...prev, emoji] : [emoji],
      );
    },
  });
};

export const useDeleteEmoji = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      publicApi.instance.delete(`/emojis/${id}`).then(() => id),
    onSuccess: (id) => {
      qc.setQueryData<EmojiDto[]>(EMOJIS_KEY, (prev) =>
        prev ? prev.filter((e) => e.id !== id) : [],
      );
    },
  });
};
