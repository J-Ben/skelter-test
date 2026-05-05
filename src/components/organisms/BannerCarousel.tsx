import { FlatList, StyleSheet, View } from 'react-native';
import type { SkeletonConfig } from 'react-zero-skeleton';

import { BANNER_GAP, BANNER_WIDTH } from '@/src/constants/banner';
import type { Banner } from '@/src/types/banner';

import { BannerCard } from '../molecules/BannerCard';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    gap: BANNER_GAP,
  },
});

type Props = {
  banners: Banner[];
  isLoading?: boolean;
  skeletonConfig?: SkeletonConfig;
  onBannerPress?: (banner: Banner) => void;
};

export function BannerCarousel({
  banners,
  isLoading,
  skeletonConfig,
  onBannerPress,
}: Props) {
  return (
    <FlatList
      horizontal
      data={banners}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      snapToInterval={BANNER_WIDTH + BANNER_GAP}
      decelerationRate="fast"
      ItemSeparatorComponent={() => <View style={{ width: BANNER_GAP }} />}
      renderItem={({ item }) => (
        <BannerCard
          banner={item}
          isLoading={isLoading}
          skeletonConfig={skeletonConfig}
          onPress={() => onBannerPress?.(item)}
        />
      )}
    />
  );
}
