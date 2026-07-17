import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SkeletonTheme } from 'react-zero-skeleton';
import { SkeletonDevTools } from 'react-zero-skeleton/devtools';
import 'react-native-reanimated';

import { useState } from 'react';
import { DARK, LIGHT, ThemeContext, AnimationName } from '@/src/hooks/useTheme';

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const [cascade, setCascade] = useState(3);
  const [globalAnimation, setGlobalAnimation] = useState<AnimationName | null>(null);
  const theme = isDark ? DARK : LIGHT;
  const toggle = () => setIsDark(d => !d);
  const toggleCascade = () => setCascade(c => c > 0 ? 0 : 3);

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ theme, isDark, toggle, cascade, toggleCascade, globalAnimation, setGlobalAnimation }}>
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
          <SkeletonDevTools>
            <SkeletonTheme color={theme.skeleton} highlightColor={theme.skeletonHi} borderRadius={6} cascade={cascade}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
              </Stack>
            </SkeletonTheme>
          </SkeletonDevTools>
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </ThemeProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}
