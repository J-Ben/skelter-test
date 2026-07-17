import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

type Quake = { place: string; mag: number; time: number; depth: number; felt: number | null };
const PLACEHOLDER: Quake = { place: '15km SSW of Volcano, Hawaii', mag: 6.2, time: Date.now() - 3600000 * 5, depth: 12, felt: 1840 };

async function fetchQuake(): Promise<Quake> {
  const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_30days.geojson');
  const raw = await res.json();
  const f = raw.features[0]?.properties;
  return { place: f?.place ?? 'Unknown location', mag: f?.mag ?? 0, time: f?.time ?? Date.now(), depth: raw.features[0]?.geometry?.coordinates?.[2] ?? 0, felt: f?.felt ?? null };
}
function magColor(mag: number) { if (mag >= 7) return '#ef4444'; if (mag >= 6) return '#f97316'; if (mag >= 5) return '#eab308'; return '#22c55e'; }
function timeAgo(ms: number) { const h = Math.floor((Date.now() - ms) / 3600000); if (h < 1) return 'just now'; if (h < 24) return `${h}h ago`; return `${Math.floor(h / 24)}d ago`; }

function EarthquakeCardBase({ data }: { data: Quake }) {
  const t = useTheme();
  const color = magColor(data.mag);
  return (
    <View style={s.wrap}>
      <View style={s.magRow}>
        <Text style={[s.mag, { color }]}>{data.mag.toFixed(1)}</Text>
        <Text style={[s.magUnit, { color: t.muted }]}>magnitude</Text>
      </View>
      <Text style={[s.place, { color: t.text }]}>{data.place}</Text>
      <Text style={[s.time, { color: t.muted }]}>{timeAgo(data.time)}</Text>
      <View style={s.statsRow}>
        <View style={s.stat}>
          <Text style={[s.statLabel, { color: t.muted2 }]}>Depth</Text>
          <Text style={[s.statValue, { color: t.text }]}>{data.depth.toFixed(0)} km</Text>
        </View>
        {data.felt != null && (
          <View style={s.stat}>
            <Text style={[s.statLabel, { color: t.muted2 }]}>Felt by</Text>
            <Text style={[s.statValue, { color: t.text }]}>{data.felt.toLocaleString()}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const EarthquakeCardSkeleton = withSkeleton(EarthquakeCardBase);

export function EarthquakeCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('shaker');
  const { data, isLoading } = useCardData(fetchQuake, delay, reloadKey);
  return (
    <View>
      <Text style={[s.header, { color: t.muted2 }]}>Latest significant quake</Text>
      <SkeletonTheme animation={anim} exit="fade" revealOnExit color={t.skeleton} highlightColor={t.skeletonHi} borderRadius={6}>
        <EarthquakeCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="shaker" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { padding: 20, paddingTop: 12 },
  header:    { fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 0 },
  magRow:    { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginBottom: 6 },
  mag:       { fontSize: 52, fontWeight: '800', lineHeight: 56 },
  magUnit:   { fontSize: 13, marginBottom: 8, alignSelf: 'flex-start' },
  place:     { fontSize: 14, fontWeight: '600', marginBottom: 4, alignSelf: 'flex-start' },
  time:      { fontSize: 12, marginBottom: 20, alignSelf: 'flex-start' },
  statsRow:  { flexDirection: 'row', gap: 24 },
  stat:      { alignItems: 'flex-start' },
  statLabel: { fontSize: 11, marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '600' },
});
