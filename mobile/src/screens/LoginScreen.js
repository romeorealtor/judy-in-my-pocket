import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const handleGoogleLogin = () => {
    navigation.replace('ToolSetup');
  };

  return (
    <View style={styles.container}>
      {/* Branding */}
      <View style={styles.brandSection}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoEmoji}>🏠</Text>
        </View>
        <Text style={styles.appName}>Judy</Text>
        <Text style={styles.goldBar}>✦</Text>
      </View>

      {/* Heading */}
      <View style={styles.headingSection}>
        <Text style={styles.heading}>Welcome to Judy</Text>
        <Text style={styles.subheading}>Sign in to access your AI assistant</Text>
      </View>

      {/* Google Button */}
      <View style={styles.authSection}>
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin} activeOpacity={0.85}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.emailBtn} onPress={handleGoogleLogin} activeOpacity={0.85}>
          <Text style={styles.emailBtnText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.legalText}>
        By signing in you agree to our{' '}
        <Text style={styles.legalLink}>Terms</Text>
        {' '}& {' '}
        <Text style={styles.legalLink}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 28,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent + '55',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  goldBar: {
    fontSize: 20,
    color: colors.accent,
    marginTop: 4,
  },
  headingSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  authSection: {
    marginBottom: 28,
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4285F4',
    marginRight: 10,
    fontFamily: 'serif',
  },
  googleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    letterSpacing: 0.2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  emailBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  emailBtnText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  legalText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: colors.accent,
  },
});
