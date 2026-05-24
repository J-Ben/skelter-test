import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';

type HNStory = { title: string; by: string; score: number; descendants: number; url: string; time: number };

const PLACEHOLDER: HNStory = {
  title: 'Building a zero-config skeleton library for React',
  by: 'j-ben', score: 342, descendants: 87,
  url: 'https://github.com/J-Ben/skelter',
  time: Math.floor(Date.now() / 1000) - 7200,
};

async function fetchHNStory(): Promise<HNStory> {
  const ids: number[] = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(r => r.json());
  const raw = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json`).then(r => r.json());
  return {
    title: raw.title,
    by: raw.by,
    score: raw.score,
    descendants: raw.descendants ?? 0,
    url: raw.url ?? `https://news.ycombinator.com/item?id=${raw.id}`,
    time: raw.time,
  };
}

function timeAgo(unix: number): string {
  const h = Math.floor((Date.now() / 1000 - unix) / 3600);
  if (h < 1) return 'just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function domainOf(url: string): string {
  try { return new URL(url).hostname.replace('www.', ''); }
  catch { return 'news.ycombinator.com'; }
}

function HNCardBase({ data }: { data: HNStory }) {
  return (
    <View style={s.wrap}>
      <View style={s.row}>
        <View style={s.scoreCol}>
          <Text style={s.score}>{data.score}</Text>
          <Text style={s.scorePts}>pts</Text>
        </View>
        <View style={s.content}>
          <Text style={s.title}>{data.title}</Text>
          <Text style={s.domain}>{domainOf(data.url)}</Text>
          <View style={s.meta}>
            <Text style={s.metaText}>by {data.by}</Text>
            <Text style={s.metaText}>{timeAgo(data.time)}</Text>
            <Text style={s.metaText}>{data.descendants} comments</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const HNCardSkeleton = withSkeleton(HNCardBase);

export function HackerNewsCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const { data, isLoading } = useCardData(fetchHNStory, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation="slide" revealOnExit color="#3f3f46" highlightColor="#71717a" borderRadius={6} minDuration={3000}>
        <HNCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="slide" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:     { padding: 20 },
  row:      { flexDirection: 'row', gap: 16 },
  scoreCol: { alignItems: 'center', width: 44, flexShrink: 0 },
  score:    { fontSize: 24, fontWeight: '800', color: '#f97316', lineHeight: 26 },
  scorePts: { fontSize: 10, color: '#52525b' },
  content:  { flex: 1 },
  title:    { fontSize: 14, fontWeight: '600', color: '#f4f4f5', lineHeight: 20, marginBottom: 10 },
  domain:   { fontSize: 11, color: '#3f3f46', marginBottom: 8 },
  meta:     { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
  metaText: { fontSize: 11, color: '#52525b' },
});
