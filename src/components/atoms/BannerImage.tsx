import { Image, StyleSheet } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

import { BANNER_HEIGHT, BANNER_WIDTH } from '@/src/constants/banner';

const styles = StyleSheet.create({
  image: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
});

type Props = { uri: string };

const BannerImageBase = ({ uri }: Props) => (
  <Image source={{ uri }} style={styles.image} resizeMode="cover" />
);

export const BannerImage = withSkeleton(BannerImageBase);
