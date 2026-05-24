import { StyleSheet, Text, View } from 'react-native';

export function AnimationBadge({ label }: { label: string }) {
  return (
    <View style={s.badge} pointerEvents="none">
      <Text style={s.text}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#27272a',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717a',
    letterSpacing: 0.3,
  },
});
