import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayScreen } from '../screens/PlayScreen';
import { ScoringScreen } from '../screens/scoring/ScoringScreen';
import { TeeTimeScreen } from '../screens/TeeTimeScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { BetsScreen } from '../screens/BetsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RoundDetailScreen } from '../screens/RoundDetailScreen';
import { useAppStore } from '../stores/appStore';

const Tab = createBottomTabNavigator();
const PlayStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function PlayStackNavigator() {
  return (
    <PlayStack.Navigator screenOptions={{ headerShown: false }}>
      <PlayStack.Screen name="PlayHome" component={PlayScreen} />
      <PlayStack.Screen
        name="Scoring"
        component={ScoringScreen}
        options={{ gestureEnabled: false }}
      />
      <PlayStack.Screen name="TeeTimes" component={TeeTimeScreen} />
    </PlayStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} />
      <ProfileStack.Screen name="RoundDetail" component={RoundDetailScreen} />
    </ProfileStack.Navigator>
  );
}

export function BottomTabNavigator() {
  const hideTabBar = useAppStore((s) => s.hideTabBar);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#84d7af',
        tabBarInactiveTintColor: '#bec9c1',
        tabBarStyle: hideTabBar
          ? { display: 'none' as const }
          : {
              backgroundColor: 'rgba(16, 21, 17, 0.7)',
              borderTopColor: 'rgba(63, 73, 67, 0.2)',
              borderTopWidth: 1,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: 'absolute' as const,
              elevation: 0,
              height: 85,
              paddingBottom: 28,
              paddingTop: 8,
            },
        tabBarLabelStyle: {
          fontFamily: 'Manrope',
          fontSize: 11,
          fontWeight: '600' as const,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={PlayStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="golf" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="podium" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bets"
        component={BetsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
