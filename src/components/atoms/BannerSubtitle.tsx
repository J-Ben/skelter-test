import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
});

type Props = { children: string };

const BannerSubtitleBase = ({ children }: Props) => (
  <Text style={styles.subtitle} numberOfLines={1}>
    {children}
  </Text>
);

export const BannerSubtitle = withSkeleton(BannerSubtitleBase);
