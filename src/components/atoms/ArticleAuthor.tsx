import { StyleSheet, Text } from 'react-native';
import { withSkeleton } from 'react-zero-skeleton';

const styles = StyleSheet.create({
  author: {
    fontSize: 14,
    color: '#555',
  },
});

type Props = { children: string };

const ArticleAuthorBase = ({ children }: Props) => (
  <Text style={styles.author} numberOfLines={1}>
    {children}
  </Text>
);

export const ArticleAuthor = withSkeleton(ArticleAuthorBase);
