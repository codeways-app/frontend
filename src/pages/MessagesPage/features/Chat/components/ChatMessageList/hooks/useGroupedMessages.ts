import { useMemo } from 'react';
import { MessageResponseDto } from '@/shared/api';

const TEN_MINUTES = 10 * 60 * 1000;

export const useGroupedMessages = (messages: MessageResponseDto[]) => {
  return useMemo(() => {
    const groupsMap = new Map<
      string,
      (MessageResponseDto & { isCompact: boolean })[]
    >();

    messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toDateString();

      if (!groupsMap.has(dateKey)) {
        groupsMap.set(dateKey, []);
      }

      const group = groupsMap.get(dateKey)!;
      const previousMessage = group[group.length - 1];

      let isCompact = false;

      if (previousMessage) {
        const sameSender =
          previousMessage.sender.id === message.sender.id;

        const timeDiff =
          Math.abs(
            new Date(message.createdAt).getTime() -
            new Date(previousMessage.createdAt).getTime(),
          );

        isCompact = sameSender && timeDiff <= TEN_MINUTES;
      }

      group.push({
        ...message,
        isCompact,
      });
    });

    return Array.from(groupsMap.entries()).map(([dateKey, items]) => ({
      dateKey,
      dateVal: items[0].createdAt,
      items,
    }));
  }, [messages]);
};