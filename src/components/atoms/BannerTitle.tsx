import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

type Props = { children: string };

const BannerTitleBase = ({ children }: Props) => (
  <Text style={styles.title} numberOfLines={1}>
    {children}
  </Text>
);

export const BannerTitle = withSkeleton(BannerTitleBase);
