import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import { FadeLayoutProps } from '../types';

export const FadeLayout = ({
  children,
  blur = false,
  duration = 1000,
  easing = 'power2.out',
  initialOpacity = 0,
}: FadeLayoutProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        autoAlpha: initialOpacity,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      },
      {
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: duration / 1000,
        ease: easing,
      },
    );
  }, [blur, duration, easing, initialOpacity]);

  return <div ref={ref}>{children}</div>;
};
