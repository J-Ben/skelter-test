import { Pressable, StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

import { CARD_WIDTH } from '@/src/constants/layout';

const styles = StyleSheet.create({
  action: {
    width: CARD_WIDTH * 0.5,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#111',
    alignItems: 'center',
    marginTop: 4,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

type Props = {
  label: string;
  onPress?: () => void;
};

const FollowButtonBase = ({ label, onPress }: Props) => (
  <Pressable style={styles.action} onPress={onPress}>
    <Text style={styles.actionText}>{label}</Text>
  </Pressable>
);

export const FollowButton = withSkeleton(FollowButtonBase);
