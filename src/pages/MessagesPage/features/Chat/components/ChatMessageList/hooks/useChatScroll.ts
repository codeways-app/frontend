import { useCallback, useEffect, useRef, useState } from 'react';

import { MessageResponseDto } from '@/shared/api';

export const useChatScroll = (
  messages: MessageResponseDto[],
  selectedChat: string | null,
  targetMessageId?: string | null,
  targetMessageToken?: string | null,
  onMessageScrolled?: () => void,
) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

  const lastChatRef = useRef<string | null>(null);
  // Keyed by the per-click token (not the message id) so re-clicking the same
  // message — even in an already-open chat — always re-triggers the scroll.
  const handledTokenRef = useRef<string | null>(null);
  // True while a target-message scroll/highlight is in progress. Unlike
  // `hasPendingTarget` below (derived from `handledTokenRef`, which is
  // mutated synchronously by the highlight effect), this stays true for the
  // whole highlight duration, so it can't flip to false mid-scroll from an
  // IntersectionObserver-driven re-render and let the bottom-anchor effect
  // snap the view back down before the smooth scroll finishes.
  const pendingTargetRef = useRef(false);
  // Kept in a ref so the highlight-clear effect below doesn't get cancelled
  // by unrelated re-renders that change this callback's identity.
  const onMessageScrolledRef = useRef(onMessageScrolled);
  useEffect(() => {
    onMessageScrolledRef.current = onMessageScrolled;
  }, [onMessageScrolled]);

  const scrollToBottom = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    const el = messagesEndRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
        setShowScrollButton(!entry.isIntersecting);
      },
      {
        root: el.parentElement,
        rootMargin: '0px 0px 100% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selectedChat]);

  const hasPendingTarget = Boolean(targetMessageToken && handledTokenRef.current !== targetMessageToken);

  useEffect(() => {
    if (pendingTargetRef.current) return;
    if (isAtBottom) {
      scrollToBottom('smooth');
    }
  }, [messages, isAtBottom, scrollToBottom, highlightedMessageId]);

  // Jump to the bottom when switching chats — but only once per chat, and not
  // when a search result requested scrolling to a specific message instead.
  useEffect(() => {
    if (lastChatRef.current === selectedChat) return;
    lastChatRef.current = selectedChat;

    if (hasPendingTarget) return;
    scrollToBottom('auto');
  }, [selectedChat, hasPendingTarget, scrollToBottom]);

  // Scroll to and briefly highlight the message that matched a search query.
  // Re-runs on every click (identified by `targetMessageToken`), even for the
  // same message in a chat that's already open.
  useEffect(() => {
    if (!targetMessageId || !targetMessageToken || handledTokenRef.current === targetMessageToken) {
      return;
    }

    const container = messagesEndRef.current?.parentElement;
    const target = container?.querySelector<HTMLElement>(
      `[data-message-id="${CSS.escape(targetMessageId)}"]`,
    );
    if (!target) return;

    handledTokenRef.current = targetMessageToken;
    pendingTargetRef.current = true;

    // `.content` uses flex-direction: column-reverse, where native
    // scrollIntoView({ block: 'center' }) is computed unreliably across
    // browsers (especially for older messages near the top). Scroll by the
    // delta needed to center the target instead.
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta =
      targetRect.top + targetRect.height / 2 - (containerRect.top + containerRect.height / 2);
    container.scrollBy({ top: delta, behavior: 'smooth' });

    // Reset first so re-clicking an already-highlighted message restarts the
    // CSS animation instead of being a no-op (same state value = no re-render).
    setHighlightedMessageId(null);
    const raf = requestAnimationFrame(() => setHighlightedMessageId(targetMessageId));
    return () => cancelAnimationFrame(raf);
  }, [targetMessageId, targetMessageToken, messages]);

  // Clear the highlight after it fades. Kept in its own effect, depending only
  // on `highlightedMessageId`, so unrelated re-renders (new messages arriving,
  // parent re-renders) can't cancel this timer before it fires.
  useEffect(() => {
    if (!highlightedMessageId) return;

    const timer = setTimeout(() => {
      pendingTargetRef.current = false;
      setHighlightedMessageId(null);
      onMessageScrolledRef.current?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [highlightedMessageId]);

  return { messagesEndRef, scrollToBottom, showScrollButton, highlightedMessageId };
};
