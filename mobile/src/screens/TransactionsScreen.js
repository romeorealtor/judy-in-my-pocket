import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors } from '../theme/colors';

const ALL_TRANSACTIONS = [
  {
    id: '1',
    address: '4521 Oak Street',
    city: 'Bethesda, MD 20814',
    client: 'Sarah & Mike Johnson',
    status: 'Under Contract',
    closeDate: 'Oct 18, 2026',
    progress: 0.65,
    milestones: [
      { label: 'Offer Accepted', done: true },
      { label: 'Inspection', done: true },
      { label: 'Appraisal', done: false },
      { label: 'Clear to Close', done: false },
      { label: 'Closing Day', done: false },
    ],
  },
  {
    id: '2',
    address: '891 Maple Avenue',
    city: 'Rockville, MD 20850',
    client: 'David Martinez',
    status: 'Pending Close',
    closeDate: 'Oct 6, 2026',
    progress: 0.92,
    milestones: [
      { label: 'Offer Accepted', done: true },
      { label: 'Inspection', done: true },
      { label: 'Appraisal', done: true },
      { label: 'Clear to Close', done: true },
      { label: 'Closing Day', done: false },
    ],
  },
  {
    id: '3',
    address: '34 Elm Court',
    city: 'Silver Spring, MD 20901',
    client: 'The Chen Family',
    status: 'Under Contract',
    closeDate: 'Oct 27, 2026',
    progress: 0.4,
    milestones: [
      { label: 'Offer Accepted', done: true },
      { label: 'Inspection', done: true },
      { label: 'Appraisal', done: false },
      { label: 'Clear to Close', done: false },
      { label: 'Closing Day', done: false },
    ],
  },
  {
    id: '4',
    address: '7723 Willow Lane',
    city: 'Potomac, MD 20854',
    client: 'Rachel Kim',
    status: 'Active Listing',
    closeDate: 'TBD',
    progress: 0.15,
    milestones: [
      { label: 'Listed on MLS', done: true },
      { label: 'Offer Accepted', done: false },
      { label: 'Inspection', done: false },
      { label: 'Clear to Close', done: false },
      { label: 'Closing Day', done: false },
    ],
  },
];

const statusColor = (status) => {
  switch (status) {
    case 'Pending Close': return colors.success;
    case 'Under Contract': return colors.warning;
    case 'Active Listing': return colors.info;
    default: return colors.textSecondary;
  }
};

function TransactionDetail({ transaction, onBack }) {
  return (
    <ScrollView style={styles.detailContainer} contentContainerStyle={{ paddingBottom: 40 }}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.detailHeader}>
        <Text style={styles.detailAddress}>{transaction.address}</Text>
        <Text style={styles.detailCity}>{transaction.city}</Text>
        <Text style={styles.detailClient}>{transaction.client}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor(transaction.status) + '22' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor(transaction.status) }]} />
          <Text style={[styles.statusText, { color: statusColor(transaction.status) }]}>
            {transaction.status}
          </Text>
        </View>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailCardTitle}>Close Date</Text>
        <Text style={styles.detailCardValue}>{transaction.closeDate}</Text>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.detailCardTitle}>Progress</Text>
          <Text style={styles.progressPct}>{Math.round(transaction.progress * 100)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${transaction.progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailCardTitle}>Milestones</Text>
        {transaction.milestones.map((m, i) => (
          <View key={i} style={styles.milestoneRow}>
            <View style={[styles.milestoneCheck, m.done && styles.milestoneCheckDone]}>
              {m.done && <Text style={styles.milestoneCheckMark}>✓</Text>}
            </View>
            <Text style={[styles.milestoneLabel, m.done && styles.milestoneLabelDone]}>
              {m.label}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default function TransactionsScreen() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <TransactionDetail transaction={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <Text style={styles.headerCount}>{ALL_TRANSACTIONS.length} active</Text>
      </View>

      {ALL_TRANSACTIONS.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={styles.txCard}
          onPress={() => setSelected(t)}
          activeOpacity={0.8}
        >
          <View style={styles.txTop}>
            <View style={styles.txInfo}>
              <Text style={styles.txAddress}>{t.address}</Text>
              <Text style={styles.txCity}>{t.city}</Text>
              <Text style={styles.txClient}>{t.client}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor(t.status) + '22' }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor(t.status) }]} />
              <Text style={[styles.statusText, { color: statusColor(t.status) }]}>{t.status}</Text>
            </View>
          </View>

          <View style={styles.txBottom}>
            <Text style={styles.txClose}>Close: {t.closeDate}</Text>
            <Text style={styles.txPct}>{Math.round(t.progress * 100)}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${t.progress * 100}%`, backgroundColor: statusColor(t.status) },
              ]}
            />
          </View>
          <Text style={styles.txTap}>Tap for details →</Text>
        </TouchableOpacity>
      ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerCount: {
    fontSize: 13,
    color: colors.textSecondary,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  txCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  txTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  txInfo: {
    flex: 1,
    marginRight: 12,
  },
  txAddress: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  txCity: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  txClient: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  txBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  txClose: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  txPct: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  txTap: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'right',
  },
  // Detail
  detailContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backBtn: {
    padding: 20,
    paddingTop: 24,
  },
  backText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  detailHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailAddress: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  detailCity: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  detailClient: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 12,
    fontWeight: '500',
  },
  detailCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  detailCardTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailCardValue: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressPct: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 15,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  milestoneCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneCheckDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  milestoneCheckMark: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  milestoneLabel: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  milestoneLabelDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
