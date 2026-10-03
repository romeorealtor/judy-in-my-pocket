import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.houseIcon}>🏠</Text>
      </View>
      <Text style={styles.appName}>Judy</Text>
      <Text style={styles.tagline}>Your AI Real Estate Assistant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.accent + '44',
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  houseIcon: {
    fontSize: 52,
  },
  appName: {
    fontSize: 52,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
