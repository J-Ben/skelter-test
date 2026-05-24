import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statLabel}>{label}</Text>
      <Text style={s.statValue}>{value}</Text>
    </View>
  );
}

function WeatherCardBase({ data }: { data: Weather }) {
  return (
    <View style={s.wrap}>
      <Text style={s.city}>{data.city}</Text>
      <Text style={s.temp}>{data.temp}°</Text>
      <Text style={s.desc}>{data.description}</Text>
      <View style={s.row}>
        <Stat label="Feels like" value={`${data.feelsLike}°`} />
        <Stat label="Humidity"   value={`${data.humidity}%`} />
        <Stat label="Wind"       value={`${data.wind} km/h`} />
      </View>
    </View>
  );
}

const WeatherCardSkeleton = withSkeleton(WeatherCardBase);

export function WeatherCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const { data, isLoading } = useCardData(fetchWeather, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation="shatter" revealOnExit color="#3f3f46" highlightColor="#71717a" borderRadius={6}
        minDuration={3000} shatterConfig={{ cellSize: 13, stagger: 60, fadeStyle: 'random',gridSize: 100 }}>
        <WeatherCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER}  /> 
      </SkeletonTheme>
      <AnimationBadge label="shatter" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:      { padding: 36 },
  city:      { fontSize: 13, color: '#71717a', marginBottom: 4, alignSelf: 'flex-start' },
  temp:      { fontSize: 56, fontWeight: '700', lineHeight: 60, marginBottom: 4, color: '#f4f4f5', alignSelf: 'flex-start' },
  desc:      { fontSize: 15, color: '#a1a1aa', marginBottom: 20, alignSelf: 'flex-start' },
  row:       { flexDirection: 'row', gap: 24 },
  stat:      { alignItems: 'flex-start' },
  statLabel: { fontSize: 11, color: '#52525b', marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '600', color: '#f4f4f5' },
});
