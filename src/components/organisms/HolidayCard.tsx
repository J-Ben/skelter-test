import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';

type Holiday = { name: string; localName: string; date: string; daysUntil: number };

const PLACEHOLDER: Holiday = { name: 'Assumption of Mary', localName: 'Assomption', date: '2026-08-15', daysUntil: 42 };

async function fetchHoliday(): Promise<Holiday> {
  const res = await fetch('https://date.nager.at/api/v3/NextPublicHolidays/FR');
  const raw = await res.json();
  const next = raw[0];
  const daysUntil = Math.ceil((new Date(next.date).getTime() - Date.now()) / 86400000);
  return { name: next.name, localName: next.localName, date: next.date, daysUntil };
}

function HolidayCardBase({ data }: { data: Holiday }) {
  const [year, month, day] = data.date.split('-');
  const formatted = new Date(+year, +month - 1, +day).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
  return (
    <View style={s.wrap}>
      <Text style={s.header}>Next public holiday 🇫🇷</Text>
      <Text style={s.localName}>{data.localName}</Text>
      <Text style={s.name}>{data.name}</Text>
      <View style={s.footer}>
        <View style={s.footerLeft}>
          <Text style={s.footerLabel}>Date</Text>
          <Text style={s.footerValue}>{formatted}</Text>
        </View>
        <View style={s.daysWrap}>
          <Text style={s.daysCount}>{data.daysUntil}</Text>
          <Text style={s.daysLabel}>days</Text>
        </View>
      </View>
    </View>
  );
}

const HolidayCardSkeleton = withSkeleton(HolidayCardBase);

export function HolidayCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const { data, isLoading } = useCardData(fetchHoliday, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation="wave" revealOnExit color="#3f3f46" highlightColor="#71717a" borderRadius={6} minDuration={3000}>
        <HolidayCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="wave" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:       { padding: 24 },
  header:     { fontSize: 11, color: '#71717a', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1, alignSelf: 'flex-start' },
  localName:  { fontSize: 20, fontWeight: '700', marginBottom: 6, color: '#f4f4f5', alignSelf: 'flex-start' },
  name:       { fontSize: 13, color: '#71717a', marginBottom: 20, alignSelf: 'flex-start' },
  footer:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  footerLeft: { alignItems: 'flex-start' },
  footerLabel:{ fontSize: 11, color: '#52525b', marginBottom: 2 },
  footerValue:{ fontSize: 13, fontWeight: '600', color: '#f4f4f5' },
  daysWrap:   { alignItems: 'flex-end' },
  daysCount:  { fontSize: 36, fontWeight: '700', color: '#f97316', lineHeight: 38 },
  daysLabel:  { fontSize: 11, color: '#71717a' },
});
