import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  WeatherCard, CurrencyCard, AirQualityCard, HolidayCard,
  EarthquakeCard, ProductCard, HackerNewsCard, HealthCard, ParagraphCard,
} from '@/src/components/organisms';
import { useTheme, useThemeToggle, ANIMATIONS } from '@/src/hooks/useTheme';

const DELAYS = [0, 300, 600, 900, 1200, 1500, 1800, 2100];

export function HomeScreen() {
  const [reloadKey, setReloadKey] = useState(0);
  const t = useTheme();
  const { isDark, toggle, cascade, toggleCascade, globalAnimation, setGlobalAnimation } = useThemeToggle();

  return (
    <SafeAreaView style={[s.container, { backgroundColor: t.bg }]} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <Text style={[s.appName, { color: t.text }]}>skelter</Text>
          <Text style={[s.subtitle, { color: t.muted2 }]}>The loading experience your users deserve</Text>
          <Text style={[s.animLabel, { color: t.muted }]}>
            anim: {globalAnimation ?? 'preset'}
          </Text>
        </View>

        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><WeatherCard    delay={DELAYS[0]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><HackerNewsCard delay={DELAYS[1]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><CurrencyCard   delay={DELAYS[2]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><AirQualityCard delay={DELAYS[3]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><HolidayCard    delay={DELAYS[4]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><ProductCard    delay={DELAYS[5]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><EarthquakeCard delay={DELAYS[6]} reloadKey={reloadKey} /></View>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><HealthCard     delay={DELAYS[7]} reloadKey={reloadKey} /></View>

        <Text style={[s.sectionTitle, { color: t.text }]}>Paragraph</Text>
        <Text style={[s.sectionSub, { color: t.muted2 }]}>SkeletonParagraph · lines & words</Text>
        <View style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}><ParagraphCard  delay={DELAYS[2]} reloadKey={reloadKey} /></View>

        <Text style={[s.footer, { color: t.muted2 }]}>with ♥ Ben-J</Text>
      </ScrollView>

      <View style={[s.bottomBar, { borderTopColor: t.border, backgroundColor: t.bg }]}>
        <Pressable
          onPress={() => setReloadKey(k => k + 1)}
          style={({ pressed }) => [s.reloadBtn, { backgroundColor: t.surface2, flex: 1 }, pressed && s.reloadBtnPressed]}
        >
          <Text style={[s.reloadText, { color: t.text }]}>Reload ↺</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            const idx = globalAnimation ? ANIMATIONS.indexOf(globalAnimation) : -1;
            const next = idx < ANIMATIONS.length - 1 ? ANIMATIONS[idx + 1] : null;
            setGlobalAnimation(next);
            setReloadKey(k => k + 1);
          }}
          style={({ pressed }) => [s.themeBtn, { backgroundColor: globalAnimation ? t.accent + '22' : t.surface2, borderColor: globalAnimation ? t.accent : t.border }, pressed && s.reloadBtnPressed]}
        >
          <Text style={[s.reloadText, { color: globalAnimation ? t.accent : t.text }]}>
            {globalAnimation ? `A${ANIMATIONS.indexOf(globalAnimation) + 1}` : 'A0'}
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleCascade}
          style={({ pressed }) => [s.themeBtn, { backgroundColor: cascade > 0 ? t.accent + '22' : t.surface2, borderColor: cascade > 0 ? t.accent : t.border }, pressed && s.reloadBtnPressed]}
        >
          <Text style={[s.reloadText, { color: cascade > 0 ? t.accent : t.text }]}>↓</Text>
        </Pressable>
        <Pressable
          onPress={toggle}
          style={({ pressed }) => [s.themeBtn, { backgroundColor: t.surface2, borderColor: t.border }, pressed && s.reloadBtnPressed]}
        >
          <Text style={[s.reloadText, { color: t.text }]}>{isDark ? '☀︎' : '☽'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:        { flex: 1 },
  scroll:           { flex: 1 },
  content:          { paddingBottom: 24 },
  header:           { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 20 },
  appName:          { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, marginBottom: 4 },
  subtitle:         { fontSize: 13, marginBottom: 6 },
  animLabel:        { fontSize: 11, fontFamily: 'monospace' },
  footer:           { textAlign: 'center', fontSize: 12, paddingVertical: 28 },
  sectionTitle:     { fontSize: 20, fontWeight: '800', letterSpacing: -0.3, marginHorizontal: 16, marginTop: 24, marginBottom: 2 },
  sectionSub:       { fontSize: 12, fontFamily: 'monospace', marginHorizontal: 16, marginBottom: 12 },
  card:             { marginHorizontal: 16, marginBottom: 12, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  row:              { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, gap: 8 },
  cardHalf:         { flex: 1, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  bottomBar:        { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, flexDirection: 'row', gap: 10 },
  reloadBtn:        { borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  themeBtn:         { borderRadius: 10, paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center', borderWidth: 1 },
  reloadBtnPressed: { opacity: 0.7 },
  reloadText:       { fontSize: 14, fontWeight: '600' },
});
