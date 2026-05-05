import { Image, StyleSheet } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const AVATAR_SIZE = 96;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_RADIUS,
    backgroundColor: '#eee',
  },
});

type Props = { uri: string };

const AvatarBase = ({ uri }: Props) => (
  <Image source={{ uri }} style={styles.avatar} />
);

export const Avatar = withSkeleton(AvatarBase, {
  measureStrategy: 'root-only',
  boneStyle: { borderRadius: AVATAR_RADIUS },
});
