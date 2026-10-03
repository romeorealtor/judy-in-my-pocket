import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import TransactionCard from '../components/TransactionCard';
import LeadCard from '../components/LeadCard';

const TRANSACTIONS = [
  {
    id: '1',
    address: '4521 Oak Street, Bethesda MD',
    client: 'Sarah & Mike Johnson',
    status: 'Under Contract',
    daysToClose: 12,
  },
  {
    id: '2',
    address: '891 Maple Ave, Rockville MD',
    client: 'David Martinez',
    status: 'Pending Close',
    daysToClose: 3,
  },
  {
    id: '3',
    address: '34 Elm Court, Silver Spring MD',
    client: 'The Chen Family',
    status: 'Under Contract',
    daysToClose: 21,
  },
];

const TASKS = [
  { id: '1', label: 'Review Johnson inspection report', done: true },
  { id: '2', label: 'Call Martinez re: final walkthrough', done: false },
  { id: '3', label: 'Send Chen family market update', done: false },
  { id: '4', label: 'Follow up on Zillow lead — (301) 555-0192', done: false },
];

const LEADS = [
  {
    id: '1',
    name: 'Rachel Kim',
    source: 'Zillow',
    phone: '(301) 555-0192',
    timeAgo: '14 min ago',
  },
  {
    id: '2',
    name: 'James & Tina Ortiz',
    source: 'Realtor.com',
    phone: '(240) 555-8847',
    timeAgo: '2 hrs ago',
  },
];

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState(TASKS);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}, Alex 👋</Text>
          <Text style={styles.subGreeting}>Here's your day at a glance</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* Active Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {TRANSACTIONS.map((t) => (
          <TransactionCard key={t.id} transaction={t} />
        ))}
      </View>

      {/* Today's Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.card}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskRow}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
                {task.done && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[styles.taskLabel, task.done && styles.taskLabelDone]}
              >
                {task.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Leads */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Leads</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>2 new</Text>
          </View>
        </View>
        {LEADS.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnIcon}>📝</Text>
            <Text style={styles.quickBtnLabel}>Log Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnIcon}>📤</Text>
            <Text style={styles.quickBtnLabel}>Send Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnIcon}>📊</Text>
            <Text style={styles.quickBtnLabel}>View Pipeline</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  bellBtn: {
    position: 'relative',
    width: 44,
    height: 44,
    backgroundColor: colors.card,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bellIcon: {
    fontSize: 20,
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.critical,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  seeAll: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  taskLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  taskLabelDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  newBadge: {
    backgroundColor: colors.accent + '22',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent + '55',
  },
  newBadgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickBtnIcon: {
    fontSize: 26,
  },
  quickBtnLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});
