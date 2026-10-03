import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function LeadCard({ lead }) {
  const { name, source, phone, timeAgo } = lead;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name[0]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
          <View style={styles.meta}>
            <View style={styles.sourcePill}>
              <Text style={styles.sourceText}>{source}</Text>
            </View>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callBtnText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.msgBtn}>
          <Text style={styles.msgBtnText}>💬</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accent + '33',
    borderWidth: 1,
    borderColor: colors.accent + '66',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sourcePill: {
    backgroundColor: colors.info + '22',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  sourceText: {
    fontSize: 10,
    color: colors.info,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 11,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBtnText: {
    fontSize: 16,
  },
  msgBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgBtnText: {
    fontSize: 16,
  },
});
