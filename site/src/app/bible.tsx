import { Image } from 'expo-image';
import type { Metadata } from 'expo-router/server';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function generateMetadata(): Metadata {
  return { title: 'ENGL-215' };
}

export default function TabTwoScreen() {
  const [code, setCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();
  const codeLines = code?.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setCodeError('Loading bible.xml is supported on web only.');
      return;
    }

    let active = true;

    async function loadCode() {
      try {
        const response = await fetch('/bible.xml');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const source = await response.text();
        if (active) {
          setCode(source);
        }
      } catch (error) {
        if (active) {
          setCodeError(error instanceof Error ? error.message : String(error));
        }
      }
    }

    void loadCode();

    return () => {
      active = false;
    };
  }, []);

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Text Encoding</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            For Major Project 2 I encoded a page in a copy of the King James Bible from around 1889 into a TEI XML file. I paid extra attention to the details of the stains and made sure to properly format the table of contents.
          </ThemedText>
          <br/>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            (TODO) - 300 word explaination of how my tei and the object and showcased via this pages design
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <ThemedView type="backgroundElement" style={styles.pageContainer}>
            <Image
              source={require('@/assets/images/bible-page-6.jpg')}
              contentFit="contain"
              style={styles.pageImage}
            />
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.codeContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {codeError ? (
                <ThemedText type="small" themeColor="textSecondary">
                  Could not load bible.xml: {codeError}
                </ThemedText>
              ) : codeLines ? (
                <ThemedView type="backgroundElement" style={styles.codeRow}>
                  <ThemedText
                    type="code"
                    themeColor="textSecondary"
                    style={styles.lineNumbers}>
                    {codeLines.map((_, index) => index + 1).join('\n')}
                  </ThemedText>
                  <ThemedText type="code" selectable style={styles.code}>
                    {codeLines.join('\n')}
                  </ThemedText>
                </ThemedView>
              ) : (
                <ThemedText type="small" themeColor="textSecondary">
                  Loading bible.xml...
                </ThemedText>
              )}
            </ScrollView>
          </ThemedView>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth * 1.7,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  sectionsWrapper: {
    flexDirection: 'row',
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  pageContainer: {
    flex: 1,
    aspectRatio: 2252 / 4000,
    alignSelf: 'flex-start',
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  pageImage: {
    width: '100%',
    height: '100%',
  },
  codeContainer: {
    flex: 1,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  codeRow: {
    flexDirection: 'row',
  },
  lineNumbers: {
    width: 40,
    lineHeight: 18,
    textAlign: 'right',
    paddingRight: Spacing.two,
  },
  code: {
    width: 480 * 1.7,
    lineHeight: 18,
  },
});
