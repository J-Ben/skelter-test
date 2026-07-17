import { createContext, useContext } from 'react';

export const DARK = {
  bg:         '#09090b',
  surface:    '#18181b',
  surface2:   '#27272a',
  border:     '#27272a',
  text:       '#f4f4f5',
  muted:      '#71717a',
  muted2:     '#52525b',
  accent:     '#f97316',
  skeleton:   '#3f3f46',
  skeletonHi: '#71717a',
};

export const LIGHT = {
  bg:         '#ffffff',
  surface:    '#f4f4f5',
  surface2:   '#ededf0',
  border:     '#e4e4e7',
  text:       '#09090b',
  muted:      '#71717a',
  muted2:     '#a1a1aa',
  accent:     '#f97316',
  skeleton:   '#c4c4cc',
  skeletonHi: '#dcdce4',
};

export type Theme = typeof DARK;

export const ANIMATIONS = ['pulse','wave','shiver','shatter','slide','beat','drip','shaker'] as const;
export type AnimationName = typeof ANIMATIONS[number];

export const ThemeContext = createContext<{
  theme: Theme;
  isDark: boolean;
  toggle: () => void;
  cascade: number;
  toggleCascade: () => void;
  globalAnimation: AnimationName | null;
  setGlobalAnimation: (a: AnimationName | null) => void;
}>({
  theme: DARK,
  isDark: true,
  toggle: () => {},
  cascade: 0,
  toggleCascade: () => {},
  globalAnimation: null,
  setGlobalAnimation: () => {},
});

export function useTheme(): Theme {
  return useContext(ThemeContext).theme;
}

export function useThemeToggle() {
  const { isDark, toggle, cascade, toggleCascade, globalAnimation, setGlobalAnimation } = useContext(ThemeContext);
  return { isDark, toggle, cascade, toggleCascade, globalAnimation, setGlobalAnimation };
}

export function useSkeletonAnimation(defaultAnim: AnimationName): AnimationName {
  const { globalAnimation } = useContext(ThemeContext);
  return globalAnimation ?? defaultAnim;
}
