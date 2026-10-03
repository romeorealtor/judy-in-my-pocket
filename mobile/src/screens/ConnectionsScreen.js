import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, StatusBar, SafeAreaView
} from 'react-native';

// All integrations with emoji icons (replace with real images later)
const ALL_INTEGRATIONS = [
  // CRM
  { id: 'kw_command',     name: 'KW Command',        icon: '🏡', category: 'CRM',         tier: 1 },
  { id: 'follow_up_boss', name: 'Follow Up Boss',    icon: '⭐', category: 'CRM',         tier: 1 },
  { id: 'lofty',          name: 'Lofty / Chime',     icon: '🔷', category: 'CRM',         tier: 2 },
  // Transaction
  { id: 'lone_wolf',      name: 'Lone Wolf',         icon: '🐺', category: 'Transactions', tier: 1 },
  { id: 'dotloop',        name: 'Dotloop',           icon: '🔄', category: 'Transactions', tier: 1 },
  { id: 'skyslope',       name: 'Skyslope',          icon: '📐', category: 'Transactions', tier: 2 },
  // E-Signature
  { id: 'docusign',       name: 'DocuSign',          icon: '✍️', category: 'E-Signature', tier: 1 },
  { id: 'pandadocs',      name: 'PandaDocs',         icon: '🐼', category: 'E-Signature', tier: 1 },
  // Email & Calendar
  { id: 'gmail',          name: 'Gmail',             icon: '📧', category: 'Email',        tier: 1 },
  { id: 'google_cal',     name: 'Google Calendar',   icon: '📅', category: 'Calendar',     tier: 1 },
  { id: 'outlook',        name: 'Outlook',           icon: '📨', category: 'Email',        tier: 2 },
  // Social
  { id: 'facebook',       name: 'Facebook',          icon: '👥', category: 'Social',       tier: 2 },
  { id: 'instagram',      name: 'Instagram',         icon: '📸', category: 'Social',       tier: 2 },
  { id: 'youtube',        name: 'YouTube',           icon: '▶️', category: 'Social',       tier: 2 },
  { id: 'linkedin',       name: 'LinkedIn',          icon: '💼', category: 'Social',       tier: 2 },
  { id: 'tiktok',         name: 'TikTok',            icon: '🎵', category: 'Social',       tier: 3 },
  // Leads
  { id: 'zillow',         name: 'Zillow',            icon: '🏘️', category: 'Leads',        tier: 1 },
  { id: 'realtor_com',    name: 'Realtor.com',       icon: '🔑', category: 'Leads',        tier: 1 },
  { id: 'homes_com',      name: 'Homes.com',         icon: '🏠', category: 'Leads',        tier: 2 },
  // MLS/Data
  { id: 'bright_mls',    name: 'Bright MLS',        icon: '📊', category: 'MLS & Data',   tier: 1 },
  { id: 'rpr',            name: 'RPR',               icon: '📈', category: 'MLS & Data',   tier: 1 },
  { id: 'cloud_cma',      name: 'Cloud CMA',         icon: '📉', category: 'MLS & Data',   tier: 1 },
  // Scheduling
  { id: 'calendly',       name: 'Calendly',          icon: '🗓️', category: 'Scheduling',   tier: 2 },
  { id: 'acuity',         name: 'Acuity',            icon: '⏰', category: 'Scheduling',   tier: 2 },
  // Communication
  { id: 'zoom',           name: 'Zoom',              icon: '📹', category: 'Communication',tier: 2 },
  { id: 'sms',            name: 'SMS / Texting',     icon: '💬', category: 'Communication',tier: 2 },
  // Storage
  { id: 'google_drive',   name: 'Google Drive',      icon: '☁️', category: 'Storage',      tier: 3 },
  // Advertising
  { id: 'fb_ads',         name: 'Facebook Ads',      icon: '📣', category: 'Advertising',  tier: 2 },
  { id: 'google_ads',     name: 'Google Ads',        icon: '🎯', category: 'Advertising',  tier: 3 },
];

export default function ConnectionsScreen() {
  const [search, setSearch] = useState('');
  // Simulate some already connected
  const [connected, setConnected] = useState(
    new Set(['gmail', 'google_cal', 'facebook', 'instagram'])
  );

  const handleConnect = (id) => {
    setConnected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filtered = ALL_INTEGRATIONS.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const connectedList = filtered.filter(i => connected.has(i.id));
  const availableList = filtered.filter(i => !connected.has(i.id));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connections</Text>
        <Text style={styles.headerSub}>Connect your tools to unlock Judy's full power</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search apps..."
            placeholderTextColor="#AEAEB2"
            value={search}
            onChangeText={setSearch}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

        {/* Connected Section */}
        {connectedList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Connected</Text>
            <View style={styles.groupCard}>
              {connectedList.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.row,
                    index < connectedList.length - 1 && styles.rowBorder
                  ]}
                  onPress={() => handleConnect(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <Text style={styles.iconEmoji}>{item.icon}</Text>
                  </View>
                  <Text style={styles.rowName}>{item.name}</Text>
                  <View style={styles.rowRight}>
                    <View style={styles.connectedDot} />
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Available Section */}
        {availableList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Available</Text>
            <View style={styles.groupCard}>
              {availableList.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.row,
                    index < availableList.length - 1 && styles.rowBorder
                  ]}
                  onPress={() => handleConnect(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <Text style={styles.iconEmoji}>{item.icon}</Text>
                  </View>
                  <Text style={styles.rowName}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.connectBtn}
                    onPress={() => handleConnect(item.id)}
                  >
                    <Text style={styles.connectBtnText}>Connect</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No integrations found for "{search}"</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 3,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconEmoji: {
    fontSize: 20,
  },
  rowName: {
    flex: 1,
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  chevron: {
    fontSize: 20,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  connectBtn: {
    paddingHorizontal: 0,
  },
  connectBtnText: {
    fontSize: 17,
    color: '#007AFF',
    fontWeight: '400',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
