'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]';

type ScrambleTextProps = {
  text: string;
  className?: string;
  speed?: number;
  as?: keyof JSX.IntrinsicElements;
};

export default function ScrambleText({ text, className, speed = 30, as: Tag = 'span' }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length;

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

      iteration += 1 / 3; // resolve ~3 scramble frames per character

      if (iteration >= maxIterations) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);
  };

  return (
    <Tag ref={ref as never} className={className}>
      {displayed}
    </Tag>
  );
}
