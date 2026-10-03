import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ChatScreen from '../screens/ChatScreen';
import AlertsScreen from '../screens/AlertsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: '🏠',
  Transactions: '📋',
  Chat: '💬',
  Connections: '🔌',
  Alerts: '🔔',
};

function TabIcon({ name, focused, alertCount }) {
  return (
    <View style={styles.iconWrap}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {TAB_ICONS[name]}
      </Text>
      {alertCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{alertCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon
            name={route.name}
            focused={focused}
            alertCount={route.name === 'Alerts' ? 1 : 0}
          />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 10,
              color: focused ? colors.accent : colors.textMuted,
              fontWeight: focused ? '700' : '400',
              marginBottom: 4,
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          paddingTop: 8,
          height: 60 + insets.bottom,
        },
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerTitle: () => (
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>{route.name}</Text>
            <Text style={styles.headerSubtitle}>Judy · AI Agent</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <View style={styles.judyPill}>
              <View style={styles.judyDot} />
              <Text style={styles.judyPillText}>Judy Online</Text>
            </View>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Connections" component={ConnectionsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 28,
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.45,
  },
  tabIconFocused: {
    opacity: 1,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: colors.critical,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: colors.tabBar,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  headerTitle: {
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  headerRight: {
    paddingRight: 16,
  },
  judyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  judyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  judyPillText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '600',
  },
});
