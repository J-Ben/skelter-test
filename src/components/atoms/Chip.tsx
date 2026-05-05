import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#eee',
  },
  chipActive: {
    backgroundColor: '#111',
  },
  chipText: {
    fontSize: 13,
    color: '#111',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
});

type Props = {
  label: string;
  active?: boolean;
  onPress: () => void;
};

export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}
