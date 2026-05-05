export const CODE_SNIPPETS = {
  article: `// ArticleCard.tsx
export function ArticleCard({ article, isLoading, skeletonConfig }: Props) {
  const sk = { hasSkeleton: true, isLoading: !!isLoading, skeletonConfig };
  return (
    <View style={styles.card}>
      <ArticleImage uri={article.image} {...sk} />
      <View style={styles.content}>
        <ArticleTitle {...sk}>{article.title}</ArticleTitle>
        <ArticleAuthor {...sk}>{article.author}</ArticleAuthor>
        <ArticleDate {...sk}>{article.date}</ArticleDate>
      </View>
    </View>
  );
}`,
  profile: `// ProfileCard.tsx
export function ProfileCard({ profile, onFollow, isLoading, skeletonConfig }: Props) {
  const sk = { hasSkeleton: true, isLoading: !!isLoading, skeletonConfig };
  return (
    <View style={styles.card}>
      <Avatar uri={profile.avatar} {...sk} />
      <ProfileName {...sk}>{profile.name}</ProfileName>
      <ProfileRole {...sk}>{profile.role}</ProfileRole>
      <ProfileBio {...sk}>{profile.bio}</ProfileBio>
      <FollowButton label="Follow" onPress={onFollow} {...sk} />
    </View>
  );
}`,
  carousel: `// BannerCarousel.tsx
export function BannerCarousel({ banners, isLoading, skeletonConfig }: Props) {
  return (
    <FlatList
      horizontal
      data={banners}
      keyExtractor={(item) => item.id}
      snapToInterval={BANNER_WIDTH + BANNER_GAP}
      decelerationRate="fast"
      ItemSeparatorComponent={() => <View style={{ width: BANNER_GAP }} />}
      renderItem={({ item }) => (
        <BannerCard
          banner={item}
          isLoading={isLoading}
          skeletonConfig={skeletonConfig}
        />
      )}
    />
  );
}`,
} as const;
