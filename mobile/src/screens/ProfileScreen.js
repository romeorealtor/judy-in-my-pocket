import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';

const CONNECTED_TOOLS = [
  { name: 'KW Command', icon: '🏢', connected: true },
  { name: 'Gmail', icon: '📧', connected: true },
  { name: 'Google Calendar', icon: '📅', connected: true },
  { name: 'Dotloop', icon: '🔄', connected: false },
];

const SETTINGS = [
  { icon: '🔔', label: 'Notifications', description: 'Manage your alert preferences' },
  { icon: '🔒', label: 'Privacy & Security', description: 'Data and account settings' },
  { icon: '🎨', label: 'Appearance', description: 'Theme and display options' },
  { icon: '❓', label: 'Help & Support', description: 'FAQs, chat with support' },
  { icon: '📄', label: 'Terms & Privacy', description: 'Legal information' },
];

export default function ProfileScreen({ navigation }) {
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Hero */}
      <View style={styles.hero}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>AJ</Text>
        </View>
        <Text style={styles.agentName}>Alex Johnson</Text>
        <Text style={styles.brokerage}>KW Success Realty</Text>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Active Deals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>YTD Closes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>$8.2M</Text>
            <Text style={styles.statLabel}>Volume</Text>
          </View>
        </View>
      </View>

      {/* Judy AI status */}
      <View style={styles.judyCard}>
        <View style={styles.judyCardLeft}>
          <Text style={styles.judyCardIcon}>🤖</Text>
          <View>
            <Text style={styles.judyCardTitle}>Judy AI</Text>
            <Text style={styles.judyCardSub}>Active · Processing 4 deals</Text>
          </View>
        </View>
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlinePillText}>Online</Text>
        </View>
      </View>

      {/* Connected Tools */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Tools</Text>
        <View style={styles.card}>
          {CONNECTED_TOOLS.map((tool, i) => (
            <View
              key={tool.name}
              style={[
                styles.toolRow,
                i < CONNECTED_TOOLS.length - 1 && styles.toolRowBorder,
              ]}
            >
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={styles.toolName}>{tool.name}</Text>
              {tool.connected ? (
                <View style={styles.connectedTag}>
                  <Text style={styles.connectedTagText}>✓ Connected</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.connectTag}>
                  <Text style={styles.connectTagText}>Connect</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          {SETTINGS.map((s, i) => (
            <TouchableOpacity
              key={s.label}
              style={[
                styles.settingRow,
                i < SETTINGS.length - 1 && styles.settingRowBorder,
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.settingIcon}>{s.icon}</Text>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{s.label}</Text>
                <Text style={styles.settingDesc}>{s.description}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sign Out */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.signOutBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Judy v1.0.0 · Nous Research</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarInitials: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
  },
  agentName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  brokerage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.accent,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  judyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.success + '44',
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  judyCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  judyCardIcon: {
    fontSize: 28,
  },
  judyCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  judyCardSub: {
    fontSize: 12,
    color: colors.success,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  onlinePillText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  toolRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toolIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  toolName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  connectedTag: {
    backgroundColor: colors.success + '22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  connectedTagText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '600',
  },
  connectTag: {
    backgroundColor: colors.accent + '22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent + '55',
  },
  connectTagText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
    lineHeight: 24,
  },
  signOutBtn: {
    borderWidth: 1,
    borderColor: colors.critical + '55',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signOutText: {
    color: colors.critical,
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
  },
});
