import { StyleSheet, View } from 'react-native';

import { Chip } from '@/src/components/atoms';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export const EXAMPLES = ['article', 'profile', 'carousel'] as const;
export type ExampleKind = (typeof EXAMPLES)[number];

type Props = {
  value: ExampleKind;
  onChange: (value: ExampleKind) => void;
};

export function ExamplePicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {EXAMPLES.map((kind) => (
        <Chip
          key={kind}
          label={kind}
          active={kind === value}
          onPress={() => onChange(kind)}
        />
      ))}
    </View>
  );
}
