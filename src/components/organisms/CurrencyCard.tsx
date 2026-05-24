import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';

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
  return (
    <View style={s.wrap}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={s.header}>Currency Exchange Rates</Text>
      </View>
      {PAIRS.map(({ key, label, decimals }) => (
        <View key={key} style={s.row}>
          <Text style={s.label}>{label}</Text>
          <Text style={s.value}>{data[key].toFixed(decimals)}</Text>
        </View>
      ))}
      <View style={{ flexDirection: 'row' }}>
        <Text style={s.source}>Source: Frankfurter API</Text>
      </View>
    </View>
  );
}

const CurrencyCardSkeleton = withSkeleton(CurrencyCardBase);

export function CurrencyCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const { data, isLoading } = useCardData(fetchRates, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation="pulse" revealOnExit color="#3f3f46" highlightColor="#71717a" borderRadius={6} minDuration={3000}>
        <CurrencyCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="pulse" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { padding: 24 },
  header: { fontSize: 11, color: '#71717a', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1, alignSelf: 'flex-start', },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  label: { fontSize: 13, color: '#a1a1aa' },
  value: { fontSize: 13, fontWeight: '700', fontVariant: ['tabular-nums'], color: '#f4f4f5' },
  source: { fontSize: 11, color: '#3f3f46', marginTop: 8, alignSelf: 'flex-start' },
});
