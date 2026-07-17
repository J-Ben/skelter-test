import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

type Product = { title: string; description: string; price: number; rating: number; category: string };
const PLACEHOLDER: Product = { title: 'iPhone 9', description: 'An apple mobile which is nothing like apple.', price: 549, rating: 4.7, category: 'smartphones' };
const CAT_COLORS: Record<string, string> = { smartphones: '#6366f1', laptops: '#3b82f6', fragrances: '#a855f7', skincare: '#ec4899', groceries: '#22c55e', 'home-decoration': '#f97316' };
const catColor = (c: string) => CAT_COLORS[c] ?? '#71717a';
const stars = (r: number) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

async function fetchProduct(): Promise<Product> {
  const id = Math.floor(Math.random() * 50) + 1;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const raw = await res.json();
  return { title: raw.title, description: (raw.description as string).slice(0, 72), price: raw.price, rating: raw.rating, category: raw.category };
}

function ProductCardBase({ data }: { data: Product }) {
  const t = useTheme();
  const color = catColor(data.category);
  return (
    <View>
      <View style={[s.hero, { backgroundColor: t.surface2 }]}>
        <Text style={s.heroEmoji}>🛍</Text>
      </View>
      <View style={s.wrap}>
        <View style={[s.badge, { backgroundColor: color + '20' }]}>
          <Text style={[s.badgeText, { color }]}>{data.category}</Text>
        </View>
        <Text style={[s.title, { color: t.text }]}>{data.title}</Text>
        <Text style={[s.desc, { color: t.muted }]}>{data.description}</Text>
        <View style={s.footer}>
          <Text style={[s.price, { color: t.accent }]}>${data.price}</Text>
          <Text style={s.stars}>{stars(data.rating)}</Text>
        </View>
      </View>
    </View>
  );
}
const ProductCardSkeleton = withSkeleton(ProductCardBase);

export function ProductCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('drip');
  const { data, isLoading } = useCardData(fetchProduct, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation={anim} exit="fade" revealOnExit color={t.skeleton} highlightColor={t.skeletonHi} borderRadius={6} minDuration={3000}>
        <ProductCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="drip" />
    </View>
  );
}

const s = StyleSheet.create({
  hero:      { height: 110, alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 36 },
  wrap:      { padding: 18 },
  badge:     { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, marginBottom: 8 },
  badgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  title:     { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  desc:      { fontSize: 12, lineHeight: 18, marginBottom: 14 },
  footer:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price:     { fontSize: 18, fontWeight: '700' },
  stars:     { fontSize: 13, color: '#fbbf24', letterSpacing: 1 },
});
