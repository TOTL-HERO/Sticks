import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

type OrgRole = 'COMMISSIONER' | 'ADMIN' | 'COACH' | 'PLAYER';
const ROLES: OrgRole[] = ['COMMISSIONER', 'ADMIN', 'COACH', 'PLAYER'];
const ROLE_COLORS: Record<OrgRole, string> = {
  COMMISSIONER: '#e9c349', ADMIN: '#84d7af', COACH: '#c0c0c0', PLAYER: '#bec9c1',
};

interface Member {
  id: string;
  userId: string;
  role: OrgRole;
  user: { firstName: string; lastName: string; email?: string };
}

export function RoleManagementScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const orgId = route.params?.organizationId;
  const queryClient = useQueryClient();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrgRole>('PLAYER');
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<Member[]>({
    queryKey: ['org-members', orgId],
    queryFn: () => apiFetch<Member[]>(`/organizations/${orgId}/roster`),
    enabled: !!orgId,
  });

  const inviteMutation = useMutation({
    mutationFn: () =>
      apiFetch(`/organizations/${orgId}/members`, {
        method: 'POST',
        body: JSON.stringify({ email: inviteEmail.trim(), role: inviteRole }),
      }),
    onSuccess: () => {
      setInviteEmail('');
      queryClient.invalidateQueries({ queryKey: ['org-members', orgId] });
      Alert.alert('Invited', 'Member added');
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: OrgRole }) =>
      apiFetch(`/organizations/${orgId}/members/${memberId}`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      }),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ['org-members', orgId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const members = data ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Members</Text>
        <Text style={styles.count}>{members.length}</Text>
      </View>

      {/* Invite */}
      <Card marginHorizontal={16} marginBottom={12}>
        <Text style={styles.sectionTitle}>Invite Member</Text>
        <TextInput style={styles.input} value={inviteEmail} onChangeText={setInviteEmail} placeholder="Name or email" placeholderTextColor="#88938c" />
        <View style={styles.roleRow}>
          {ROLES.map((r) => (
            <TouchableOpacity key={r} onPress={() => setInviteRole(r)} activeOpacity={0.7}
              style={[styles.chip, inviteRole === r && styles.chipActive]}>
              <Text style={[styles.chipText, inviteRole === r && styles.chipTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button variant="primary" fullWidth onPress={() => {
          if (!inviteEmail.trim()) { Alert.alert('Validation', 'Enter a name or email'); return; }
          inviteMutation.mutate();
        }}>
          {inviteMutation.isPending ? 'Inviting...' : 'Invite'}
        </Button>
      </Card>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load members</Text>
        </View>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Card marginBottom={8}>
              <View style={styles.memberRow}>
                <View style={styles.avatar}>
                  <MaterialCommunityIcons name="account" size={20} color="#bec9c1" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.user.firstName} {item.user.lastName}</Text>
                  {item.user.email && <Text style={styles.email}>{item.user.email}</Text>}
                </View>
                <TouchableOpacity
                  onPress={() => setEditingId(editingId === item.id ? null : item.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.roleBadge, { borderColor: ROLE_COLORS[item.role] }]}>
                    <Text style={[styles.roleText, { color: ROLE_COLORS[item.role] }]}>{item.role}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {editingId === item.id && (
                <View style={styles.editRoleRow}>
                  {ROLES.map((r) => (
                    <TouchableOpacity key={r} onPress={() => updateRoleMutation.mutate({ memberId: item.id, role: r })} activeOpacity={0.7}
                      style={[styles.chip, item.role === r && styles.chipActive]}>
                      <Text style={[styles.chipText, item.role === r && styles.chipTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Card>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  count: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  sectionTitle: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '700', color: '#bec9c1', marginBottom: 8 },
  input: { backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14, marginBottom: 8 },
  roleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  chipActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  chipText: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600', color: '#bec9c1' },
  chipTextActive: { color: '#84d7af' },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  email: { fontFamily: 'Manrope', fontSize: 11, color: '#88938c' },
  roleBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  roleText: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600' },
  editRoleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(63,73,67,0.3)' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
