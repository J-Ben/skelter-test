import { StyleSheet, View } from 'react-native';
import type { SkeletonConfig } from 'react-zero-skeleton';

import {
  BannerCta,
  BannerImage,
  BannerSubtitle,
  BannerTitle,
} from '@/src/components/atoms';
import { BANNER_HEIGHT, BANNER_WIDTH } from '@/src/constants/banner';
import type { Banner } from '@/src/types/banner';

const styles = StyleSheet.create({
  card: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 14,
    justifyContent: 'flex-end',
    gap: 6,
  },
});

type Props = {
  banner: Banner;
  onPress?: () => void;
  isLoading?: boolean;
  skeletonConfig?: SkeletonConfig;
};

export function BannerCard({
  banner,
  onPress,
  isLoading,
  skeletonConfig,
}: Props) {
  const sk = { hasSkeleton: true, isLoading: !!isLoading, skeletonConfig };
  return (
    <View style={styles.card}>
      <BannerImage uri={banner.image} {...sk} />
      <View style={styles.overlay} pointerEvents="box-none">
        <BannerTitle {...sk}>{banner.title}</BannerTitle>
        <BannerSubtitle {...sk}>{banner.subtitle}</BannerSubtitle>
        <BannerCta label={banner.cta} onPress={onPress} {...sk} />
      </View>
    </View>
  );
}
