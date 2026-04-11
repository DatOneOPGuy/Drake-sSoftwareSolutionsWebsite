'use client';

import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import styles from './scrollStory.module.css';

type StoryScene = {
  label: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  align?: 'left' | 'right';
};

const scenes: StoryScene[] = [
  {
    label: 'Vision',
    title: 'Computer vision in production contexts',
    description:
      'From stream data to practical dashboards, the focus is fast iteration and useful output.',
    image: '/bands/coding.jpg',
    align: 'right',
  },
  {
    label: 'Apps',
    title: 'Desktop and Android workflow tooling',
    description:
      'Internal software built to support operations, automation, and reliable day-to-day execution.',
    image: '/bands/keyboard.jpg',
  },
  {
    label: 'Interface',
    title: 'Motion and hierarchy used with intent',
    description:
      'Animation is used to guide attention and improve pacing, not to distract from the product.',
    video: '/hero.mp4',
    align: 'right',
  },
  {
    label: 'Security',
    title: 'Network monitoring and hardening work',
    description:
      'Practical security tasks across monitoring, prevention, troubleshooting, and infrastructure updates.',
    image: '/bands/hallway.jpg',
  },
];

function StoryStep({
  label,
  title,
  description,
  align,
}: {
  label: string;
  title: string;
  description: string;
  align?: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 25%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.24, 1, 1, 0.35]);
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [42, 0, -18]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.98, 1, 0.985]);

  return (
    <div ref={ref} className={`${styles.storyStep} ${align === 'right' ? styles.alignRight : ''}`}>
      <motion.div style={{ opacity, y, scale }} className={styles.stepContent}>
        <p className={styles.stepLabel}>{label}</p>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
      </motion.div>
    </div>
  );
}

function StoryMediaLayer({
  scene,
  scrollYProgress,
  segment,
  index,
}: {
  scene: StoryScene;
  scrollYProgress: MotionValue<number>;
  segment: number;
  index: number;
}) {
  const center = index * segment;
  const prev = Math.max(0, center - segment);
  const next = Math.min(1, center + segment);
  const opacity = useTransform(scrollYProgress, [prev, center, next], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [prev, center, next], [1.06, 1.02, 1]);

  return (
    <motion.div className={styles.mediaLayer} style={{ opacity, scale }}>
      {scene.video ? (
        <video className={styles.mediaAsset} src={scene.video} autoPlay muted loop playsInline />
      ) : (
        <Box className={styles.mediaAsset} bgImage={`url(${scene.image})`} bgSize="cover" bgPos="center" />
      )}
      <div className={styles.sceneOverlay} />
    </motion.div>
  );
}

export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const segment = 1 / (scenes.length - 1);

  return (
    <Box ref={ref} className={styles.storyRoot}>
      <div className={styles.stickyStage}>
        {scenes.map((scene, i) => (
          <StoryMediaLayer
            key={`${scene.label}-${i}`}
            scene={scene}
            index={i}
            segment={segment}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className={styles.storySteps}>
        {scenes.map((scene, i) => (
          <StoryStep
            key={`${scene.label}-step-${i}`}
            label={scene.label}
            title={scene.title}
            description={scene.description}
            align={scene.align}
          />
        ))}
      </div>
    </Box>
  );
}
