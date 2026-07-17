import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';
import { useTheme, useSkeletonAnimation } from '@/src/hooks/useTheme';

type Weather = { city: string; temp: number; feelsLike: number; humidity: number; wind: number; description: string };

const PLACEHOLDER: Weather = { city: 'Austin, TX', temp: 32, feelsLike: 35, humidity: 58, wind: 18, description: 'Partly cloudy' };

async function fetchWeather(): Promise<Weather> {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=30.27&longitude=-97.74&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh'
  );
  const raw = await res.json();
  const c = raw.current;
  const descriptions: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy',
    3: 'Overcast', 45: 'Fog', 51: 'Light drizzle',
    61: 'Light rain', 63: 'Moderate rain', 71: 'Light snow',
    80: 'Light showers', 95: 'Thunderstorm',
  };
  return {
    city: 'Austin, TX',
    temp: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    humidity: c.relative_humidity_2m,
    wind: Math.round(c.wind_speed_10m),
    description: descriptions[c.weather_code] ?? 'Unknown',
  };
}

function WeatherCardBase({ data }: { data: Weather }) {
  const t = useTheme();
  return (
    <View style={s.wrap}>
      <Text style={[s.city, { color: t.muted }]}>{data.city}</Text>
      <Text style={[s.temp, { color: t.text }]}>{data.temp}°</Text>
      <Text style={[s.desc, { color: t.muted2 }]}>{data.description}</Text>
      <View style={s.row}>
        <View style={s.stat}>
          <Text style={[s.statLabel, { color: t.muted2 }]}>Feels like</Text>
          <Text style={[s.statValue, { color: t.text }]}>{data.feelsLike}°</Text>
        </View>
        <View style={s.stat}>
          <Text style={[s.statLabel, { color: t.muted2 }]}>Humidity</Text>
          <Text style={[s.statValue, { color: t.text }]}>{data.humidity}%</Text>
        </View>
        <View style={s.stat}>
          <Text style={[s.statLabel, { color: t.muted2 }]}>Wind</Text>
          <Text style={[s.statValue, { color: t.text }]}>{data.wind} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const WeatherCardSkeleton = withSkeleton(WeatherCardBase);

export function WeatherCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const t = useTheme();
  const anim = useSkeletonAnimation('shatter');
  const { data, isLoading } = useCardData(fetchWeather, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation={anim} exit="fadeUp" revealOnExit color={t.skeleton} highlightColor={t.skeletonHi} borderRadius={6}
        minDuration={3000} shatterConfig={{ cellSize: 13, stagger: 60, fadeStyle: 'random', gridSize: 100 }}>
        <WeatherCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="shatter" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { padding: 36 },
  city:      { fontSize: 13, marginBottom: 4, alignSelf: 'flex-start' },
  temp:      { fontSize: 56, fontWeight: '700', lineHeight: 60, marginBottom: 4, alignSelf: 'flex-start' },
  desc:      { fontSize: 15, marginBottom: 20, alignSelf: 'flex-start' },
  row:       { flexDirection: 'row', gap: 24 },
  stat:      { alignItems: 'flex-start' },
  statLabel: { fontSize: 11, marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '600' },
});
