import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayScreen } from '../screens/PlayScreen';
import { ScoringScreen } from '../screens/scoring/ScoringScreen';
import { TeeTimeScreen } from '../screens/TeeTimeScreen';
import { CourseDetailScreen } from '../screens/tee-times/CourseDetailScreen';
import { ConfirmationScreen } from '../screens/tee-times/ConfirmationScreen';
import { SuccessScreen } from '../screens/tee-times/SuccessScreen';
import { SplitPaymentScreen } from '../screens/tee-times/SplitPaymentScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { BetsScreen } from '../screens/BetsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RoundDetailScreen } from '../screens/RoundDetailScreen';
import { TournamentDetailScreen } from '../screens/tournament/TournamentDetailScreen';
import { TournamentLeaderboardScreen } from '../screens/tournament/TournamentLeaderboardScreen';
import { CommissionerStack } from './CommissionerStack';
import { useAppStore } from '../stores/appStore';
import { apiFetch } from '../lib/api';

const Tab = createBottomTabNavigator();
const PlayStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const LeaderboardStack = createNativeStackNavigator();

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
      <PlayStack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <PlayStack.Screen name="Confirmation" component={ConfirmationScreen} />
      <PlayStack.Screen name="Success" component={SuccessScreen} />
      <PlayStack.Screen name="SplitPayment" component={SplitPaymentScreen} />
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

function LeaderboardStackNavigator() {
  return (
    <LeaderboardStack.Navigator screenOptions={{ headerShown: false }}>
      <LeaderboardStack.Screen name="LeaderboardHome" component={LeaderboardScreen} />
      <LeaderboardStack.Screen name="TournamentDetail" component={TournamentDetailScreen} />
      <LeaderboardStack.Screen name="TournamentLeaderboard" component={TournamentLeaderboardScreen} />
    </LeaderboardStack.Navigator>
  );
}

/** Check if user has COMMISSIONER or ADMIN role on any org */
function useIsCommissioner(): boolean {
  const { data } = useQuery<{ isCommissioner: boolean }>({
    queryKey: ['user-commissioner-check'],
    queryFn: async () => {
      try {
        const res = await apiFetch<{ roles: string[] }>('/users/me/org-roles');
        const isComm = (res.roles ?? []).some((r) => r === 'COMMISSIONER' || r === 'ADMIN');
        return { isCommissioner: isComm };
      } catch {
        return { isCommissioner: false };
      }
    },
    staleTime: 5 * 60 * 1000,
  });
  return data?.isCommissioner ?? false;
}

export function BottomTabNavigator() {
  const hideTabBar = useAppStore((s) => s.hideTabBar);
  const showCommissioner = useIsCommissioner();

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
        component={LeaderboardStackNavigator}
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
      {showCommissioner && (
        <Tab.Screen
          name="Commissioner"
          component={CommissionerStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="shield-crown" size={size} color={color} />
            ),
          }}
        />
      )}
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
