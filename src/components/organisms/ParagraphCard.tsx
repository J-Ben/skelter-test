import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme, SkeletonParagraph } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

const BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
  'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.';

function ParagraphCardBase() {
  const t = useTheme();
  return (
    <View style={s.wrap}>
      <Text style={[s.label, { color: t.muted }]}>ARTICLE</Text>
      <Text style={[s.title, { color: t.text }]}>The shape of loading</Text>

      {/* lines mode (size preset) */}
      <SkeletonParagraph lines={7} >
        <Text style={[s.body, { color: t.muted2 }]}>{BODY}</Text>
      </SkeletonParagraph>

      <Text style={[s.subLabel, { color: t.muted }]}>mode=&quot;words&quot;</Text>

      {/* words mode : each line split into word bones */}
      <SkeletonParagraph lines={7}  mode="words">
        <Text style={[s.body, { color: t.muted2 }]}>{BODY}</Text>
      </SkeletonParagraph>
    </View>
  );
}

const ParagraphCardSkeleton = withSkeleton(ParagraphCardBase);

export function ParagraphCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('wave');
  const { isLoading } = useCardData(async () => true, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme
        animation={anim}
        exit="fadeRight"
        revealOnExit
        color={t.skeleton}
        highlightColor={t.skeletonHi}
        borderRadius={6}
        minDuration={3000}
      >
        <ParagraphCardSkeleton hasSkeleton isLoading={isLoading} />
      </SkeletonTheme>
      <AnimationBadge label="wave" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:     { padding: 24 },
  label:    { fontSize: 11, letterSpacing: 1, marginBottom: 8, alignSelf: 'flex-start' },
  title:    { fontSize: 17, fontWeight: '700', marginBottom: 12, alignSelf: 'flex-start' },
  body:     { fontSize: 13, lineHeight: 22 },
  subLabel: { fontSize: 11, fontFamily: 'monospace', marginTop: 18, marginBottom: 8, alignSelf: 'flex-start' },
});
