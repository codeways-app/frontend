'use client';

import React, { useState, useCallback, useEffect } from 'react';

let globalChatListWidth: number | null = null;
let globalIsCollapsed: boolean | null = null;

const MIN_WIDTH = 282;
const DEFAULT_WIDTH = 336;
const COLLAPSED_WIDTH = 64;
const MAX_WIDTH = 480;

// Усилия (в пикселях) которые нужно приложить мышкой
const COLLAPSE_RESISTANCE = 200; // Сколько пикселей тянуть влево после достижения минимума, чтобы схлопнуть
const UNCOLLAPSE_RESISTANCE = 100; // Сколько пикселей тянуть вправо из состояния аватаров, чтобы расхлопнуть

export const useChatListResize = () => {
  const [chatListWidth, setChatListWidth] = useState(() => globalChatListWidth ?? DEFAULT_WIDTH);
  const [isCollapsed, setIsCollapsed] = useState(() => globalIsCollapsed ?? false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    globalChatListWidth = chatListWidth;
  }, [chatListWidth]);

  useEffect(() => {
    globalIsCollapsed = isCollapsed;
  }, [isCollapsed]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      const startX = e.clientX;
      const startWidth = isCollapsed ? COLLAPSED_WIDTH : chatListWidth;
      const wasCollapsed = isCollapsed;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;

        if (wasCollapsed) {
          // Расхлопывание
          if (deltaX > UNCOLLAPSE_RESISTANCE) {
            setIsCollapsed(false);
            setChatListWidth(MIN_WIDTH);
          }
        } else {
          const potentialWidth = startWidth + deltaX;

          // Схлопывание (пользователь тянет влево)
          if (potentialWidth < MIN_WIDTH - COLLAPSE_RESISTANCE) {
            setIsCollapsed(true);
          } else if (potentialWidth < MIN_WIDTH) {
            // Сопротивление: мы тянем влево, но ширина еще не схлопнулась
            setIsCollapsed(false);
            setChatListWidth(MIN_WIDTH);
          } else {
            // Обычный ресайз
            setIsCollapsed(false);
            setChatListWidth(Math.min(potentialWidth, MAX_WIDTH));
          }
        }
      };

      const onMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [chatListWidth, isCollapsed],
  );

  return {
    width: isCollapsed ? COLLAPSED_WIDTH : chatListWidth,
    isCollapsed,
    isResizing,
    handleMouseDown,
    COLLAPSED_WIDTH,
  };
};
