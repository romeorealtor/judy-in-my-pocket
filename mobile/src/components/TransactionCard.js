import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const statusColor = (status) => {
  switch (status) {
    case 'Pending Close': return colors.success;
    case 'Under Contract': return colors.warning;
    case 'Active Listing': return colors.info;
    default: return colors.textSecondary;
  }
};

export default function TransactionCard({ transaction }) {
  const { address, client, status, daysToClose } = transaction;
  const sc = statusColor(status);

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.addressWrap}>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.client}>{client}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: sc + '22' }]}>
          <View style={[styles.badgeDot, { backgroundColor: sc }]} />
          <Text style={[styles.badgeText, { color: sc }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.closingLabel}>
          {daysToClose <= 5
            ? `⚡ ${daysToClose} days to close`
            : `📅 ${daysToClose} days to close`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  addressWrap: {
    flex: 1,
    marginRight: 10,
  },
  address: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  client: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 4,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  closingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
