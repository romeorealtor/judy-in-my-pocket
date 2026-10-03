import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: '💬',
    title: 'Your Agent, Always On',
    body: 'Judy manages your leads, transactions, and marketing 24/7 — so you can focus on closing.',
  },
  {
    icon: '📊',
    title: 'Never Miss a Beat',
    body: 'Get instant alerts when a transaction needs attention. Every deadline tracked automatically.',
  },
  {
    icon: '🚀',
    title: 'Built for Top Producers',
    body: 'Connect your tools once. Judy handles the rest.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
    } else {
      navigation.replace('Login');
    }
  };

  const skip = () => {
    navigation.replace('Login');
  };

  const handleScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(idx);
  };

  const isLast = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {!isLast && (
        <TouchableOpacity style={styles.skipBtn} onPress={skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <View style={styles.iconCircle}>
              <Text style={styles.slideIcon}>{slide.icon}</Text>
            </View>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideBody}>{slide.body}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Next / Get Started */}
      <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
        <Text style={styles.nextText}>
          {isLast ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingBottom: 50,
  },
  skipBtn: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    marginTop: 80,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent + '55',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  slideIcon: {
    fontSize: 56,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  slideBody: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: 28,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.accent,
  },
  nextBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 24,
    width: '80%',
  },
  nextText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
