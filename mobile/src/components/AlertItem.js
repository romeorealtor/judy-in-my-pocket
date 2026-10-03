import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

const severityConfig = {
  critical: {
    color: colors.critical,
    bg: colors.critical + '18',
    border: colors.critical + '44',
  },
  warning: {
    color: colors.warning,
    bg: colors.warning + '18',
    border: colors.warning + '44',
  },
  info: {
    color: colors.info,
    bg: colors.info + '18',
    border: colors.info + '44',
  },
};

export default function AlertItem({ alert }) {
  const { severity, title, body, time, icon } = alert;
  const config = severityConfig[severity] || severityConfig.info;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: config.border, backgroundColor: config.bg }]}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <Text style={styles.alertIcon}>{icon}</Text>
        <View style={[styles.severityDot, { backgroundColor: config.color }]} />
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.bodyText}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  left: {
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 2,
  },
  alertIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bodyText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
