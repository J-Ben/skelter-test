import { StyleSheet, View } from 'react-native';
import type { SkeletonConfig } from 'react-zero-skeleton';

import {
  ArticleAuthor,
  ArticleDate,
  ArticleImage,
  ArticleTitle,
} from '@/src/components/atoms';
import { CARD_CONTENT_PADDING, CARD_WIDTH } from '@/src/constants/layout';
import type { Article } from '@/src/types/article';

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    padding: CARD_CONTENT_PADDING,
    gap: 6,
    alignItems: 'flex-start',
  },
});

type Props = {
  article: Article;
  isLoading?: boolean;
  skeletonConfig?: SkeletonConfig;
};

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
}
