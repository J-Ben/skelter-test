import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

type Rates = { USD: number; GBP: number; JPY: number; CHF: number };
const PLACEHOLDER: Rates = { USD: 1.0821, GBP: 0.8542, JPY: 161.23, CHF: 0.9731 };

async function fetchRates(): Promise<Rates> {
  const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=USD,GBP,JPY,CHF');
  const raw = await res.json();
  return raw.rates;
}

const PAIRS = [
  { key: 'USD' as const, label: 'EUR → USD', decimals: 4 },
  { key: 'GBP' as const, label: 'EUR → GBP', decimals: 4 },
  { key: 'JPY' as const, label: 'EUR → JPY', decimals: 2 },
  { key: 'CHF' as const, label: 'EUR → CHF', decimals: 4 },
];

function CurrencyCardBase({ data }: { data: Rates }) {
  const t = useTheme();
  return (
    <View style={s.body}>
      {PAIRS.map(({ key, label, decimals }) => (
        <View key={key} style={s.row}>
          <Text style={[s.label, { color: t.muted2 }]}>{label}</Text>
          <Text style={[s.value, { color: t.text }]}>{data[key].toFixed(decimals)}</Text>
        </View>
      ))}
      <Text style={[s.source, { color: t.muted2 }]}>Source: Frankfurter API</Text>
    </View>
  );
}
const CurrencyCardSkeleton = withSkeleton(CurrencyCardBase);

export function CurrencyCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('pulse');
  const { data, isLoading } = useCardData(fetchRates, delay, reloadKey);
  return (
    <View>
      <Text style={[s.header, { color: t.muted }]}>Currency Exchange Rates</Text>
      <SkeletonTheme animation={anim} exit="fade" revealOnExit color={t.skeleton} highlightColor={t.skeletonHi} borderRadius={6} minDuration={3000}>
        <CurrencyCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="pulse" />
    </View>
  );
}

const s = StyleSheet.create({
  header: { fontSize: 11, marginBottom: 0, textTransform: 'uppercase', letterSpacing: 1, alignSelf: 'flex-start', paddingHorizontal: 24, paddingTop: 24 },
  body:   { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 16 },
  row:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  label:  { fontSize: 13 },
  value:  { fontSize: 13, fontWeight: '700', fontVariant: ['tabular-nums'] },
  source: { fontSize: 11, marginTop: 8, alignSelf: 'flex-start' },
});
