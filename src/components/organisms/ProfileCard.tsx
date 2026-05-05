import { StyleSheet, View } from 'react-native';
import type { SkeletonConfig } from 'react-zero-skeleton';

import {
  Avatar,
  FollowButton,
  ProfileBio,
  ProfileName,
  ProfileRole,
} from '@/src/components/atoms';
import { CARD_CONTENT_PADDING, CARD_WIDTH } from '@/src/constants/layout';
import type { Profile } from '@/src/types/profile';

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    padding: CARD_CONTENT_PADDING * 1.5,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});

type Props = {
  profile: Profile;
  onFollow?: () => void;
  isLoading?: boolean;
  skeletonConfig?: SkeletonConfig;
};

export function ProfileCard({
  profile,
  onFollow,
  isLoading,
  skeletonConfig,
}: Props) {
  const sk = { hasSkeleton: true, isLoading: !!isLoading, skeletonConfig };
  return (
    <View style={styles.card}>
      <Avatar uri={profile.avatar} {...sk} />
      <ProfileName {...sk}>{profile.name}</ProfileName>
      <ProfileRole {...sk}>{profile.role}</ProfileRole>
      <ProfileBio {...sk}>{profile.bio}</ProfileBio>
      <FollowButton label="Follow" onPress={onFollow} {...sk} />
    </View>
  );
}
