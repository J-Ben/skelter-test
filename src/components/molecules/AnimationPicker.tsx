import { StyleSheet, View } from 'react-native';

import { Chip } from '@/src/components/atoms';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export const ANIMATIONS = ['pulse', 'wave', 'shiver', 'drip', 'shatter', 'slide', 'beat', 'none'] as const;
export type SkeletonAnimation = (typeof ANIMATIONS)[number];

type Props = {
  value: SkeletonAnimation;
  onChange: (value: SkeletonAnimation) => void;
};

export function AnimationPicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {ANIMATIONS.map((anim) => (
        <Chip
          key={anim}
          label={anim}
          active={anim === value}
          onPress={() => onChange(anim)}
        />
      ))}
    </View>
  );
}
