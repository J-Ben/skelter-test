import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

type Props = { children: string };

const ArticleTitleBase = ({ children }: Props) => (
  <Text style={styles.title} numberOfLines={1}>
    {children}
  </Text>
);

export const ArticleTitle = withSkeleton(ArticleTitleBase);
