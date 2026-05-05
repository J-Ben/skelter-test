import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    color: '#888',
  },
});

type Props = { children: string };

const ArticleDateBase = ({ children }: Props) => (
  <Text style={styles.date} numberOfLines={1}>
    {children}
  </Text>
);

export const ArticleDate = withSkeleton(ArticleDateBase);
