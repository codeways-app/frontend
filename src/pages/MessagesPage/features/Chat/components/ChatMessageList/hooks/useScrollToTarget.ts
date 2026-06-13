import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

import { MessageResponseDto } from '@/shared/api';

const HIGHLIGHT_DURATION_MS = 1200;
// Large jumps snap most of the way instantly; only the final stretch is
// smooth-scrolled, sized relative to the visible chat height.
const FAST_JUMP_RATIO = 0.75;

// Scrolls to and briefly highlights the message that matched a search query,
// and reports whether such a scroll is pending or in progress.
export const useScrollToTarget = (
  messagesEndRef: RefObject<HTMLDivElement | null>,
  messages: MessageResponseDto[],
  targetMessageId?: string | null,
  targetMessageToken?: string | null,
  onMessageScrolled?: () => void,
) => {
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

  // Keyed by the per-click token (not the message id) so re-clicking the same
  // message — even in an already-open chat — always re-triggers the scroll.
  const handledTokenRef = useRef<string | null>(null);
  // True while a target-message scroll/highlight is in progress. Unlike
  // `hasPendingTarget` below, this stays true for the whole highlight
  // duration, so an IntersectionObserver-driven re-render mid-scroll can't
  // let the bottom-anchor effect snap the view back down before it finishes.
  const pendingRef = useRef(false);
  // Kept in a ref so the highlight-clear effect below doesn't get cancelled
  // by unrelated re-renders that change this callback's identity.
  const onMessageScrolledRef = useRef(onMessageScrolled);
  useEffect(() => {
    onMessageScrolledRef.current = onMessageScrolled;
  }, [onMessageScrolled]);

  const hasPendingTarget = Boolean(
    targetMessageToken && handledTokenRef.current !== targetMessageToken,
  );

  // Re-runs on every click (identified by `targetMessageToken`), even for the
  // same message in a chat that's already open.
  useEffect(() => {
    if (
      !targetMessageId ||
      !targetMessageToken ||
      handledTokenRef.current === targetMessageToken
    ) {
      return;
    }

    const container = messagesEndRef.current?.parentElement;
    const target = container?.querySelector<HTMLElement>(
      `[data-message-id="${CSS.escape(targetMessageId)}"]`,
    );

    if (!container || !target) {
      // Give up once messages have loaded but the target still isn't
      // rendered (deleted message, or it belongs to a chat that loaded
      // without it) — otherwise `hasPendingTarget` would stay true forever
      // and permanently block the bottom-anchor effect.
      if (messages.length > 0 && !messages.some((message) => message.id === targetMessageId)) {
        handledTokenRef.current = targetMessageToken;
      }
      return;
    }

    handledTokenRef.current = targetMessageToken;
    pendingRef.current = true;

    // `.content` uses flex-direction: column-reverse, where native
    // scrollIntoView({ block: 'center' }) is computed unreliably across
    // browsers (especially for older messages near the top). Scroll by the
    // delta needed to center the target instead.
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta =
      targetRect.top + targetRect.height / 2 - (containerRect.top + containerRect.height / 2);

    // A native smooth scroll over a large distance (e.g. jumping from the
    // bottom of a long chat to a message near the top) takes several seconds.
    // Jump most of the way instantly, then finish with a short smooth scroll
    // so the landing still feels animated but the overall jump is fast.
    const fastJumpRemainder = containerRect.height * FAST_JUMP_RATIO;
    if (Math.abs(delta) > fastJumpRemainder) {
      const remainder = Math.sign(delta) * fastJumpRemainder;
      container.scrollBy({ top: delta - remainder, behavior: 'auto' });
      container.scrollBy({ top: remainder, behavior: 'smooth' });
    } else {
      container.scrollBy({ top: delta, behavior: 'smooth' });
    }

    // Reset first so re-clicking an already-highlighted message restarts the
    // CSS animation instead of being a no-op (same state value = no re-render).
    setHighlightedMessageId(null);
    const raf = requestAnimationFrame(() => setHighlightedMessageId(targetMessageId));
    return () => cancelAnimationFrame(raf);
  }, [targetMessageId, targetMessageToken, messages, messagesEndRef]);

  // Clear the highlight after it fades. Kept in its own effect, depending only
  // on `highlightedMessageId`, so unrelated re-renders (new messages arriving,
  // parent re-renders) can't cancel this timer before it fires.
  useEffect(() => {
    if (!highlightedMessageId) return;

    const timer = setTimeout(() => {
      pendingRef.current = false;
      setHighlightedMessageId(null);
      onMessageScrolledRef.current?.();
    }, HIGHLIGHT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [highlightedMessageId]);

  return {
    highlightedMessageId,
    hasPendingTarget,
    skipAutoScroll: pendingRef.current || hasPendingTarget,
  };
};