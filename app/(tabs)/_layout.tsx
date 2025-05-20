import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { Chrome as Home, Users, CalendarClock, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, a0.6)',
        tabBarBackground: () => (
          <BlurView intensity={30} style={StyleSheet.absoluteFill} tint="dark" />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="match"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          tabBarIcon: ({ color, size }) => <CalendarClock color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
});