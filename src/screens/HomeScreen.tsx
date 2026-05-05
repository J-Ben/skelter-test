import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddRandomButton, Chip, ReloadButton } from '@/src/components/atoms';
import {
  AnimationPicker,
  CodeModal,
  type SkeletonAnimation,
  type SkeletonSpeed,
  SpeedPicker,
} from '@/src/components/molecules';
import {
  ArticleCard,
  BannerCarousel,
  ProfileCard,
} from '@/src/components/organisms';
import { useFakeLoading } from '@/src/hooks/useFakeLoading';
import { MOCK_ARTICLE } from '@/src/mocks/article.mock';
import { MOCK_BANNERS } from '@/src/mocks/banner.mock';
import { MOCK_PROFILE } from '@/src/mocks/profile.mock';
import { CODE_SNIPPETS } from '@/src/constants/codeSnippets';

import { homeStyles as styles } from './Home.styles';

type Kind = 'article' | 'profile' | 'carousel';
const KINDS: Kind[] = ['article', 'profile', 'carousel'];

type Item = { id: string; kind: Kind };

const makeItem = (kind: Kind): Item => ({
  id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  kind,
});

export function HomeScreen() {
  const { isLoading, reload } = useFakeLoading();
  const [animation, setAnimation] = useState<SkeletonAnimation>('pulse');
  const [speed, setSpeed] = useState<SkeletonSpeed>('normal');
  const [items, setItems] = useState<Item[]>(() => [
    makeItem('profile'),
    makeItem('carousel'),
    makeItem('article'),
  ]);
  const [focusMode, setFocusMode] = useState(false);
  const [codeKind, setCodeKind] = useState<Kind | null>(null);

  const skeletonConfig = useMemo(
    () => ({
      animation,
      color: '#D0D0D0',
      highlightColor: '#FFFFFF',
      speed,
    }),
    [animation, speed],
  );

  const addRandom = useCallback(() => {
    const kind = KINDS[Math.floor(Math.random() * KINDS.length)];
    setItems((prev) => [...prev, makeItem(kind)]);
  }, []);

  const addKind = useCallback((kind: Kind) => {
    setItems((prev) => [...prev, makeItem(kind)]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={styles.topBar}>
        <View style={styles.headingRow}>
          <Text style={styles.heading}>react-zero-skeleton demo</Text>
          <Pressable
            onPress={() => setFocusMode((f) => !f)}
            style={[
              styles.focusToggle,
              focusMode && styles.focusToggleActive,
            ]}
          >
            <Text
              style={[
                styles.focusToggleText,
                focusMode && styles.focusToggleTextActive,
              ]}
            >
              {focusMode ? 'Show options' : 'Focus'}
            </Text>
          </Pressable>
        </View>
        {!focusMode && (
          <>
            <AnimationPicker value={animation} onChange={setAnimation} />
            <SpeedPicker value={speed} onChange={setSpeed} />
          </>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <Text style={styles.empty}>
            No component yet — tap “Add random” below.
          </Text>
        ) : (
          items.map((item) => {
            const codeBtn = (
              <Pressable
                onPress={() => setCodeKind(item.kind)}
                style={styles.codeBtn}
                hitSlop={8}
              >
                <Text style={styles.codeBtnText}>{'</>'}</Text>
              </Pressable>
            );
            if (item.kind === 'carousel') {
              return (
                <View key={item.id} style={styles.itemWrap}>
                  <BannerCarousel
                    banners={MOCK_BANNERS}
                    isLoading={isLoading}
                    skeletonConfig={skeletonConfig}
                  />
                  {codeBtn}
                </View>
              );
            }
            return (
              <View key={item.id} style={styles.itemWrap}>
                <Pressable
                  onLongPress={() => removeItem(item.id)}
                  delayLongPress={350}
                >
                  {item.kind === 'article' && (
                    <ArticleCard
                      article={MOCK_ARTICLE}
                      isLoading={isLoading}
                      skeletonConfig={skeletonConfig}
                    />
                  )}
                  {item.kind === 'profile' && (
                    <ProfileCard
                      profile={MOCK_PROFILE}
                      isLoading={isLoading}
                      skeletonConfig={skeletonConfig}
                    />
                  )}
                </Pressable>
                {codeBtn}
              </View>
            );
          })
        )}
      </ScrollView>

      {!focusMode && (
        <View style={styles.addRow}>
          {KINDS.map((kind) => (
            <Chip
              key={kind}
              label={`+ ${kind}`}
              onPress={() => addKind(kind)}
            />
          ))}
        </View>
      )}

      <View style={styles.bottomBar}>
        <AddRandomButton onPress={addRandom} label="Add random" />
        <ReloadButton isLoading={isLoading} onPress={reload} />
      </View>

      <CodeModal
        visible={codeKind !== null}
        title={codeKind ? `${codeKind} — source` : ''}
        code={codeKind ? CODE_SNIPPETS[codeKind] : ''}
        onClose={() => setCodeKind(null)}
      />
    </SafeAreaView>
  );
}
