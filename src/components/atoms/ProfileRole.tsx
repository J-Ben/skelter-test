import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  role: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

type Props = { children: string };

const ProfileRoleBase = ({ children }: Props) => (
  <Text style={styles.role} numberOfLines={1}>
    {children}
  </Text>
);

export const ProfileRole = withSkeleton(ProfileRoleBase);
