import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';

type AirQuality = { aqi: number; pm25: number; pm10: number; label: string; color: string };

const PLACEHOLDER: AirQuality = { aqi: 22, pm25: 6.8, pm10: 11.4, label: 'Fair', color: '#84cc16' };

const LEVELS = [
  { max: 20, label: 'Good',      color: '#22c55e' },
  { max: 40, label: 'Fair',      color: '#84cc16' },
  { max: 60, label: 'Moderate',  color: '#eab308' },
  { max: 80, label: 'Poor',      color: '#f97316' },
  { max: Infinity, label: 'Very poor', color: '#ef4444' },
];

async function fetchAirQuality(): Promise<AirQuality> {
  const res = await fetch(
    'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.51&longitude=-0.13&current=pm2_5,pm10,european_aqi'
  );
  const raw = await res.json();
  const aqi: number = raw.current.european_aqi;
  const { label, color } = LEVELS.find(l => aqi <= l.max)!;
  return { aqi, pm25: raw.current.pm2_5, pm10: raw.current.pm10, label, color };
}

function AirQualityCardBase({ data }: { data: AirQuality }) {
  return (
    <View style={s.wrap}>
      <Text style={s.header}>Air quality · London</Text>
      <View style={s.aqiRow}>
        <Text style={[s.aqi, { color: data.color }]}>{data.aqi}</Text>
        <Text style={s.aqiUnit}>European AQI</Text>
      </View>
      <Text style={[s.label, { color: data.color }]}>{data.label}</Text>
      <View style={s.row}>
        <View style={s.statGroup}>
          <Text style={s.statLabel}>PM2.5</Text>
          <Text style={s.statValue}>{data.pm25.toFixed(1)} µg/m³</Text>
        </View>
        <View style={s.statGroup}>
          <Text style={s.statLabel}>PM10</Text>
          <Text style={s.statValue}>{data.pm10.toFixed(1)} µg/m³</Text>
        </View>
      </View>
    </View>
  );
}

const AirQualityCardSkeleton = withSkeleton(AirQualityCardBase);

export function AirQualityCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const { data, isLoading } = useCardData(fetchAirQuality, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation="shiver" revealOnExit color="#3f3f46" highlightColor="#71717a" borderRadius={6} minDuration={3000}>
        <AirQualityCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="shiver" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { padding: 24 },
  header:    { fontSize: 11, color: '#71717a', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, alignSelf: 'flex-start' },
  aqiRow:    { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginBottom: 4 },
  aqi:       { fontSize: 52, fontWeight: '700', lineHeight: 56 },
  aqiUnit:   { fontSize: 13, color: '#71717a', marginBottom: 6 },
  label:     { fontSize: 15, fontWeight: '600', marginBottom: 20, alignSelf: 'flex-start' },
  row:       { flexDirection: 'row', gap: 24 },
  statGroup: { alignItems: 'flex-start' },
  statLabel: { fontSize: 11, color: '#52525b', marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '600', color: '#f4f4f5' },
});
