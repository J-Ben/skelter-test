import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme, SkeletonIgnore } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

type AirQuality = { aqi: number; pm25: number; pm10: number; label: string; color: string };
const PLACEHOLDER: AirQuality = { aqi: 22, pm25: 6.8, pm10: 11.4, label: 'Fair', color: '#84cc16' };
const LEVELS = [
  { max: 20, label: 'Good', color: '#22c55e' }, { max: 40, label: 'Fair', color: '#84cc16' },
  { max: 60, label: 'Moderate', color: '#eab308' }, { max: 80, label: 'Poor', color: '#f97316' },
  { max: Infinity, label: 'Very poor', color: '#ef4444' },
];
async function fetchAirQuality(): Promise<AirQuality> {
  const res = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.51&longitude=-0.13&current=pm2_5,pm10,european_aqi');
  const raw = await res.json();
  const aqi: number = raw.current.european_aqi;
  const { label, color } = LEVELS.find(l => aqi <= l.max)!;
  return { aqi, pm25: raw.current.pm2_5, pm10: raw.current.pm10, label, color };
}

function AirQualityCardBase({ data }: { data: AirQuality }) {
  const t = useTheme();
  return (
    <View style={s.wrap}>
      <SkeletonIgnore><Text style={[s.header, { color: t.muted }]}>Air quality · London</Text></SkeletonIgnore>
      <View style={s.aqiRow}>
        <Text style={[s.aqi, { color: data.color }]}>{data.aqi}</Text>
        <SkeletonIgnore><Text style={[s.aqiUnit, { color: t.muted }]}>European AQI</Text></SkeletonIgnore>
      </View>
      <Text style={[s.label, { color: data.color }]}>{data.label}</Text>
      <View style={s.row}>
        <View style={s.statGroup}>
          <Text style={[s.statLabel, { color: t.muted2 }]}>PM2.5</Text>
          <Text style={[s.statValue, { color: t.text }]}>{data.pm25.toFixed(1)} µg/m³</Text>
        </View>
        <View style={s.statGroup}>
          <Text style={[s.statLabel, { color: t.muted2 }]}>PM10</Text>
          <Text style={[s.statValue, { color: t.text }]}>{data.pm10.toFixed(1)} µg/m³</Text>
        </View>
      </View>
    </View>
  );
}
const AirQualityCardSkeleton = withSkeleton(AirQualityCardBase);

export function AirQualityCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('shiver');
  const { data, isLoading } = useCardData(fetchAirQuality, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation={anim} exit="fadeDown" revealOnExit color={t.skeleton} highlightColor={t.skeletonHi} borderRadius={6} minDuration={3000}>
        <AirQualityCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="shiver" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { padding: 24 },
  header:    { fontSize: 11, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, alignSelf: 'flex-start' },
  aqiRow:    { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginBottom: 4 },
  aqi:       { fontSize: 52, fontWeight: '700', lineHeight: 56 },
  aqiUnit:   { fontSize: 13, marginBottom: 6 },
  label:     { fontSize: 15, fontWeight: '600', marginBottom: 20, alignSelf: 'flex-start' },
  row:       { flexDirection: 'row', gap: 24 },
  statGroup: { alignItems: 'flex-start' },
  statLabel: { fontSize: 11, marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '600' },
});
