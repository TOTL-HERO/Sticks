import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommissionerHomeScreen } from '../screens/commissioner/CommissionerHomeScreen';
import { TournamentConfigScreen } from '../screens/commissioner/TournamentConfigScreen';
import { RegistrationListScreen } from '../screens/commissioner/RegistrationListScreen';
import { PairingPreviewScreen } from '../screens/commissioner/PairingPreviewScreen';
import { AnnouncementScreen } from '../screens/commissioner/AnnouncementScreen';
import { ResultsScreen } from '../screens/commissioner/ResultsScreen';
import { DisputeListScreen } from '../screens/commissioner/DisputeListScreen';
import { ScoreEditScreen } from '../screens/commissioner/ScoreEditScreen';
import { ScoringProgressScreen } from '../screens/commissioner/ScoringProgressScreen';
import { SeasonConfigScreen } from '../screens/commissioner/SeasonConfigScreen';
import { SeasonStandingsScreen } from '../screens/commissioner/SeasonStandingsScreen';
import { OrgSettingsScreen } from '../screens/commissioner/OrgSettingsScreen';
import { RoleManagementScreen } from '../screens/commissioner/RoleManagementScreen';
import { TournamentDetailScreen } from '../screens/tournament/TournamentDetailScreen';
import { TournamentLeaderboardScreen } from '../screens/tournament/TournamentLeaderboardScreen';

const Stack = createNativeStackNavigator();

export function CommissionerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommissionerHome" component={CommissionerHomeScreen} />
      <Stack.Screen name="TournamentConfig" component={TournamentConfigScreen} />
      <Stack.Screen name="RegistrationList" component={RegistrationListScreen} />
      <Stack.Screen name="PairingPreview" component={PairingPreviewScreen} />
      <Stack.Screen name="Announcement" component={AnnouncementScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="DisputeList" component={DisputeListScreen} />
      <Stack.Screen name="ScoreEdit" component={ScoreEditScreen} />
      <Stack.Screen name="ScoringProgress" component={ScoringProgressScreen} />
      <Stack.Screen name="SeasonConfig" component={SeasonConfigScreen} />
      <Stack.Screen name="SeasonStandings" component={SeasonStandingsScreen} />
      <Stack.Screen name="OrgSettings" component={OrgSettingsScreen} />
      <Stack.Screen name="RoleManagement" component={RoleManagementScreen} />
      <Stack.Screen name="TournamentDetail" component={TournamentDetailScreen} />
      <Stack.Screen name="TournamentLeaderboard" component={TournamentLeaderboardScreen} />
    </Stack.Navigator>
  );
}
