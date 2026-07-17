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
    top: 8,
    right: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    fontSize: 9,
    fontWeight: '500',
    color: '#71717a',
    letterSpacing: 0.5,
    opacity: 0.45,
  },
});
