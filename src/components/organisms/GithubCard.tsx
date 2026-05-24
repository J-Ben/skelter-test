import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withSkeleton, SkeletonTheme } from 'react-zero-skeleton';
import { useCardData } from '@/src/hooks/useCardData';
import { AnimationBadge } from '@/src/components/atoms';

type GithubProfile = { login: string; name: string; bio: string; repos: number; followers: number; following: number };

const PLACEHOLDER: GithubProfile = {
  login: 'gaearon', name: 'Dan Abramov',
  bio: 'Working on React. Also making egghead courses.',
  repos: 248, followers: 99400, following: 171,
};

const AVATAR_COLORS = ['#6366f1', '#f97316', '#22c55e', '#a855f7', '#14b8a6', '#f43f5e', '#3b82f6'];
const avatarBg = (login: string) => AVATAR_COLORS[login.charCodeAt(0) % AVATAR_COLORS.length];

async function fetchGithub(): Promise<GithubProfile> {
  const res = await fetch('https://api.github.com/users/gaearon');
  const raw = await res.json();
  return {
    login: raw.login,
    name: raw.name ?? raw.login,
    bio: ((raw.bio ?? '') as string).slice(0, 72) || 'Open source contributor.',
    repos: raw.public_repos,
    followers: raw.followers,
    following: raw.following,
  };
}

function GithubCardBase({ data }: { data: GithubProfile }) {
  return (
    <View style={s.wrap}>
      <View style={s.header}>
        <View style={[s.avatar, { backgroundColor: avatarBg(data.login) }]}>
          <Text style={s.avatarText}>{data.login[0].toUpperCase()}</Text>
        </View>
        <View style={s.identity}>
          <Text style={s.name}>{data.name}</Text>
          <Text style={s.handle}>@{data.login}</Text>
        </View>
      </View>
      <Text style={s.bio}>{data.bio}</Text>
      <View style={s.stats}>
        <View style={s.statGroup}>
          <Text style={s.statNum}>{data.repos}</Text>
          <Text style={s.statLabel}>repos</Text>
        </View>
        <View style={s.statGroup}>
          <Text style={s.statNum}>{data.followers.toLocaleString()}</Text>
          <Text style={s.statLabel}>followers</Text>
        </View>
        <View style={s.statGroup}>
          <Text style={s.statNum}>{data.following}</Text>
          <Text style={s.statLabel}>following</Text>
        </View>
      </View>
    </View>
  );
}

const GithubCardSkeleton = withSkeleton(GithubCardBase);

export function GithubCard({ delay, reloadKey }: { delay: number; reloadKey: number }) {
  const { data, isLoading } = useCardData(fetchGithub, delay, reloadKey);
  return (
    <View>
      <SkeletonTheme animation="shatter" revealOnExit color="#3f3f46" highlightColor="#71717a" borderRadius={6}
        minDuration={3000} shatterConfig={{ cellSize: 10, stagger: 40, fadeStyle: 'random' }}>
        <GithubCardSkeleton hasSkeleton isLoading={isLoading} data={data ?? PLACEHOLDER} />
      </SkeletonTheme>
      <AnimationBadge label="shatter" />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:       { padding: 20 },
  header:     { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  avatar:     { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 20 },
  identity:   { alignItems: 'flex-start' },
  name:       { fontWeight: '700', fontSize: 14, color: '#f4f4f5', marginBottom: 3 },
  handle:     { fontSize: 12, color: '#52525b' },
  bio:        { fontSize: 12, color: '#71717a', lineHeight: 19, marginBottom: 18, alignSelf: 'flex-start' },
  stats:      { flexDirection: 'row', gap: 24 },
  statGroup:  { alignItems: 'flex-start' },
  statNum:    { fontSize: 16, fontWeight: '700', color: '#f4f4f5', marginBottom: 3 },
  statLabel:  { fontSize: 11, color: '#52525b' },
});
