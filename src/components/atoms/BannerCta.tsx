import { Pressable, StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  cta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  ctaText: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',
  },
});

type Props = {
  label: string;
  onPress?: () => void;
};

const BannerCtaBase = ({ label, onPress }: Props) => (
  <Pressable style={styles.cta} onPress={onPress}>
    <Text style={styles.ctaText}>{label}</Text>
  </Pressable>
);

export const BannerCta = withSkeleton(BannerCtaBase);
