'use client';

import { useEffect, useRef, useState } from 'react';

// Only use characters that are similar width to lowercase letters to prevent layout shifts
const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

type ScrambleTextProps = {
  text: string;
  className?: string;
  speed?: number;
};

export default function ScrambleText({ text, className, speed = 30 }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          scramble();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length;
    // Speed up for longer text so it doesn't take forever on mobile
    const resolveRate = maxIterations > 30 ? 1 : 1 / 3;

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += resolveRate;

      if (iteration >= maxIterations) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);
  };

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', minWidth: '100%' }}>
      {displayed}
    </span>
  );
}
