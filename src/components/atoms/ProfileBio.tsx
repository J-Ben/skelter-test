import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

import { CARD_CONTENT_PADDING, CARD_WIDTH } from '@/src/constants/layout';

const styles = StyleSheet.create({
  bio: {
    maxWidth: CARD_WIDTH - CARD_CONTENT_PADDING * 3,
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    lineHeight: 18,
  },
});

type Props = { children: string };

const ProfileBioBase = ({ children }: Props) => (
  <Text style={styles.bio}>{children}</Text>
);

export const ProfileBio = withSkeleton(ProfileBioBase);
