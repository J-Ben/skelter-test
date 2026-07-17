import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme, SkeletonBox } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

type HealthProfile = { name: string; age: number; photo: string; location: string; heartRate: number; steps: number; sleep: number; calories: number };
const PLACEHOLDER: HealthProfile = { name: 'Sophie Martin', age: 28, photo: 'https://randomuser.me/api/portraits/women/44.jpg', location: 'Lyon, France', heartRate: 68, steps: 8432, sleep: 7.2, calories: 1840 };

async function fetchHealthProfile(): Promise<HealthProfile> {
  const res = await fetch('https://randomuser.me/api/?inc=name,picture,dob,location&nat=fr,gb,us,au');
  const { results: [u] } = await res.json();
  const age: number = u.dob.age;
  return { name: `${u.name.first} ${u.name.last}`, age, photo: u.picture.large, location: `${u.location.city}, ${u.location.country}`, heartRate: Math.max(55, 72 - Math.floor(age / 12)) + Math.floor(Math.random() * 18), steps: 3800 + Math.floor(Math.random() * 7200), sleep: Math.round((5.5 + Math.random() * 3) * 10) / 10, calories: 1500 + Math.floor(Math.random() * 1000) };
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  const t = useTheme();
  return (
    <SkeletonBox style={[s.stat, { backgroundColor: t.surface2 }]}>
      <Text style={[s.statLabel, { color: t.muted }]}>{icon} {label}</Text>
      <Text style={[s.statValue, { color: t.text }]}>{value}</Text>
    </SkeletonBox>
  );
}

function HealthCardBase({ data }: { data: HealthProfile }) {
  const t = useTheme();
  return (
    <View style={s.wrap}>
      <View style={s.profile}>
        <Image source={{ uri: data.photo }} style={s.photo} />
        <View>
          <Text style={[s.name, { color: t.text }]}>{data.name}</Text>
          <Text style={[s.age, { color: t.muted }]}>{data.age} years old</Text>
          <Text style={[s.location, { color: t.muted2 }]}>{data.location}</Text>
        </View>
      </View>
      <View style={s.statsRow}>
        <Stat icon="♥" label="Heart rate" value={`${data.heartRate} bpm`} />
        <Stat icon="⚡" label="Steps" value={data.steps.toLocaleString()} />
      </View>
      <View style={[s.statsRow, { marginTop: 8 }]}>
        <Stat icon="◑" label="Sleep" value={`${data.sleep}h`} />
        <Stat icon="◈" label="Calories" value={`${data.calories} kcal`} />
      </View>
    </View>
  );
}
const HealthCardSkeleton = withSkeleton(HealthCardBase);

export function HealthCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('beat');
  const { data, isLoading } = useCardData(fetchHealthProfile, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation={anim} exit="fadeDown" revealOnExit color={t.skeleton} highlightColor={t.skeletonHi} borderRadius={8} minDuration={3000}>
        <HealthCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="beat" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { padding: 20 },
  profile:   { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  photo:     { width: 72, height: 72, borderRadius: 36 },
  name:      { fontSize: 16, fontWeight: '700', marginBottom: 3 },
  age:       { fontSize: 12, marginBottom: 3 },
  location:  { fontSize: 12 },
  statsRow:  { flexDirection: 'row', gap: 8 },
  stat:      { flex: 1, borderRadius: 10, padding: 12 },
  statLabel: { fontSize: 11, marginBottom: 4 },
  statValue: { fontSize: 15, fontWeight: '700' },
});
