import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';

const STEPS = [
  {
    key: 'crm',
    title: 'Connect Your CRM',
    subtitle: 'Judy will sync your contacts and leads',
    options: [
      { label: 'KW Command', icon: '🏢', color: '#B22222' },
      { label: 'Follow Up Boss', icon: '🐆', color: '#FF6B00' },
    ],
  },
  {
    key: 'email',
    title: 'Connect Email',
    subtitle: 'Send updates and follow-ups automatically',
    options: [
      { label: 'Gmail', icon: '📧', color: '#EA4335' },
      { label: 'Outlook', icon: '📨', color: '#0078D4' },
    ],
  },
  {
    key: 'calendar',
    title: 'Connect Calendar',
    subtitle: 'Never miss a showing or deadline',
    options: [
      { label: 'Google Calendar', icon: '📅', color: '#4285F4' },
      { label: 'Outlook Calendar', icon: '🗓️', color: '#0078D4' },
    ],
  },
  {
    key: 'transactions',
    title: 'Transaction Platform',
    subtitle: 'Sync deals and milestones in real time',
    options: [
      { label: 'Lone Wolf', icon: '🐺', color: '#1B4F72' },
      { label: 'Dotloop', icon: '🔄', color: '#00A651' },
    ],
  },
];

export default function ToolSetupScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState({});
  const [done, setDone] = useState(false);

  const currentStep = STEPS[step];
  const progress = (step + 1) / STEPS.length;

  const handleConnect = (label) => {
    setConnected((prev) => ({ ...prev, [label]: true }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  if (done) {
    return (
      <View style={styles.doneContainer}>
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>You're all set!</Text>
        <Text style={styles.doneSubtitle}>
          Judy is ready to manage your business. Let's go!
        </Text>
        <TouchableOpacity
          style={styles.goHomeBtn}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.goHomeBtnText}>Take Me to Judy →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Let's set up your workspace</Text>
        <Text style={styles.stepCount}>Step {step + 1} of {STEPS.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Text style={styles.stepTitle}>{currentStep.title}</Text>
        <Text style={styles.stepSubtitle}>{currentStep.subtitle}</Text>

        {currentStep.options.map((opt) => {
          const isConnected = connected[opt.label];
          return (
            <TouchableOpacity
              key={opt.label}
              style={[styles.optionCard, isConnected && styles.optionCardConnected]}
              onPress={() => handleConnect(opt.label)}
              activeOpacity={0.8}
            >
              <View style={[styles.optionIcon, { backgroundColor: opt.color + '22' }]}>
                <Text style={styles.optionEmoji}>{opt.icon}</Text>
              </View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              {isConnected ? (
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedText}>✓ Connected</Text>
                </View>
              ) : (
                <View style={styles.connectBadge}>
                  <Text style={styles.connectText}>Connect</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {step < STEPS.length - 1 ? 'Next →' : 'Finish Setup'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipLink} onPress={handleSkip}>
          <Text style={styles.skipLinkText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  stepCount: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  stepSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 14,
  },
  optionCardConnected: {
    borderColor: colors.success + '88',
    backgroundColor: colors.success + '0A',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionEmoji: {
    fontSize: 26,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  connectedBadge: {
    backgroundColor: colors.success + '22',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  connectedText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  connectBadge: {
    backgroundColor: colors.accent + '22',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent + '55',
  },
  connectText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  nextBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  skipLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  skipLinkText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  doneContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  doneEmoji: {
    fontSize: 72,
    marginBottom: 24,
  },
  doneTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  doneSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  goHomeBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  goHomeBtnText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
  },
});
