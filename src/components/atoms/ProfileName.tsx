import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

type Props = { children: string };

const ProfileNameBase = ({ children }: Props) => (
  <Text style={styles.name} numberOfLines={1}>
    {children}
  </Text>
);

export const ProfileName = withSkeleton(ProfileNameBase);
