import { StyleSheet, View } from 'react-native';

import { Chip } from '@/src/components/atoms';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export const SPEEDS = ['slow', 'normal', 'rapid'] as const;
export type SkeletonSpeed = (typeof SPEEDS)[number];

type Props = {
  value: SkeletonSpeed;
  onChange: (value: SkeletonSpeed) => void;
};

export function SpeedPicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {SPEEDS.map((speed) => (
        <Chip
          key={speed}
          label={speed}
          active={speed === value}
          onPress={() => onChange(speed)}
        />
      ))}
    </View>
  );
}
