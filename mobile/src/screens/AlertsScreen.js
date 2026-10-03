import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import AlertItem from '../components/AlertItem';

const ALERTS = [
  {
    id: '1',
    severity: 'critical',
    title: 'Martinez Transaction',
    body: 'Missing HOA documents — closing at risk. Action required today.',
    time: '8 min ago',
    icon: '🚨',
  },
  {
    id: '2',
    severity: 'warning',
    title: 'Johnson Deal',
    body: 'Appraisal scheduled for tomorrow at 10 AM. Confirm access with listing agent.',
    time: '32 min ago',
    icon: '⚠️',
  },
  {
    id: '3',
    severity: 'info',
    title: 'New Lead from Zillow',
    body: '(301) 555-0192 — Rachel Kim inquired about 3BR homes in Bethesda under $850K.',
    time: '1 hr ago',
    icon: '👤',
  },
  {
    id: '4',
    severity: 'warning',
    title: 'Chen Family',
    body: 'Appraisal contingency deadline in 3 days. Schedule now to avoid delays.',
    time: '2 hrs ago',
    icon: '📅',
  },
  {
    id: '5',
    severity: 'info',
    title: 'Market Update Ready',
    body: 'Your weekly Bethesda market report is ready to send to your sphere.',
    time: '3 hrs ago',
    icon: '📊',
  },
  {
    id: '6',
    severity: 'info',
    title: 'New Lead from Realtor.com',
    body: 'James & Tina Ortiz — looking for 4BR in Silver Spring, pre-approved $950K.',
    time: '4 hrs ago',
    icon: '👨‍👩‍👧',
  },
];

export default function AlertsScreen() {
  const criticalCount = ALERTS.filter((a) => a.severity === 'critical').length;
  const warningCount = ALERTS.filter((a) => a.severity === 'warning').length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <View style={styles.badgeRow}>
          {criticalCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.critical + '22' }]}>
              <View style={[styles.dot, { backgroundColor: colors.critical }]} />
              <Text style={[styles.badgeText, { color: colors.critical }]}>
                {criticalCount} critical
              </Text>
            </View>
          )}
          {warningCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.warning + '22' }]}>
              <View style={[styles.dot, { backgroundColor: colors.warning }]} />
              <Text style={[styles.badgeText, { color: colors.warning }]}>
                {warningCount} warnings
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Critical first */}
      {['critical', 'warning', 'info'].map((severity) => {
        const items = ALERTS.filter((a) => a.severity === severity);
        if (items.length === 0) return null;
        return (
          <View key={severity} style={styles.group}>
            <Text style={styles.groupLabel}>
              {severity === 'critical' ? '🔴 Critical' : severity === 'warning' ? '🟡 Warnings' : '🔵 Info'}
            </Text>
            {items.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  group: {
    marginBottom: 8,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
