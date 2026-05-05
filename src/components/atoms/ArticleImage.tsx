import { Image, StyleSheet } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

import { CARD_WIDTH } from '@/src/constants/layout';

const styles = StyleSheet.create({
  image: {
    width: CARD_WIDTH,
    aspectRatio: 16 / 9,
  },
});

type Props = { uri: string };

const ArticleImageBase = ({ uri }: Props) => (
  <Image source={{ uri }} style={styles.image} />
);

export const ArticleImage = withSkeleton(ArticleImageBase);
