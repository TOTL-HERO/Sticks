import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface OrgData {
  id: string;
  name: string;
  logoUrl: string | null;
  colorScheme: { primary?: string; secondary?: string; accent?: string } | null;
}

export function OrgSettingsScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const orgId = route.params?.organizationId;
  const queryClient = useQueryClient();

  const [orgName, setOrgName] = useState('');
  const [primary, setPrimary] = useState('#84d7af');
  const [secondary, setSecondary] = useState('#006747');
  const [accent, setAccent] = useState('#e9c349');
  const [logoUri, setLogoUri] = useState<string | null>(null);

  const { data, isLoading } = useQuery<OrgData>({
    queryKey: ['org-settings', orgId],
    queryFn: () => apiFetch<OrgData>(`/organizations/${orgId}`),
    enabled: !!orgId,
  });

  useEffect(() => {
    if (!data) return;
    setOrgName(data.name ?? '');
    setLogoUri(data.logoUrl);
    if (data.colorScheme) {
      setPrimary(data.colorScheme.primary ?? '#84d7af');
      setSecondary(data.colorScheme.secondary ?? '#006747');
      setAccent(data.colorScheme.accent ?? '#e9c349');
    }
  }, [data]);

  const brandingMutation = useMutation({
    mutationFn: () =>
      apiFetch(`/organizations/${orgId}/branding`, {
        method: 'PUT',
        body: JSON.stringify({ name: orgName, primary, secondary, accent }),
      }),
    onSuccess: () => {
      Alert.alert('Saved', 'Branding updated');
      queryClient.invalidateQueries({ queryKey: ['org-settings', orgId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]) return;
    const asset = result.assets[0];
    if (asset.fileSize && asset.fileSize > 2 * 1024 * 1024) {
      Alert.alert('Too Large', 'Logo must be under 2 MB');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', { uri: asset.uri, name: 'logo.jpg', type: 'image/jpeg' } as any);
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'}/organizations/${orgId}/logo`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (!res.ok) throw new Error('Upload failed');
      setLogoUri(asset.uri);
      queryClient.invalidateQueries({ queryKey: ['org-settings', orgId] });
    } catch (err: any) {
      Alert.alert('Upload Error', err.message);
    }
  };

  if (isLoading) {
    return <SafeAreaView style={styles.safe}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Organization Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {/* Logo */}
        <Text style={styles.label}>Logo</Text>
        <TouchableOpacity onPress={pickLogo} activeOpacity={0.7}>
          <View style={styles.logoBox}>
            {logoUri ? (
              <Image source={{ uri: logoUri }} style={styles.logoImg} resizeMode="contain" />
            ) : (
              <MaterialCommunityIcons name="camera-plus" size={32} color="#88938c" />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.hint}>PNG or JPEG, under 2 MB</Text>

        <Text style={styles.label}>Organization Name</Text>
        <TextInput style={styles.input} value={orgName} onChangeText={setOrgName} placeholderTextColor="#88938c" />

        <Text style={styles.label}>Color Scheme</Text>
        <Card marginBottom={16}>
          {[
            { label: 'Primary', value: primary, set: setPrimary },
            { label: 'Secondary', value: secondary, set: setSecondary },
            { label: 'Accent', value: accent, set: setAccent },
          ].map((c) => (
            <View key={c.label} style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: c.value }]} />
              <Text style={styles.colorLabel}>{c.label}</Text>
              <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={c.value} onChangeText={c.set} placeholderTextColor="#88938c" />
            </View>
          ))}
        </Card>

        {/* Preview */}
        <Text style={styles.label}>Preview</Text>
        <Card marginBottom={16}>
          <View style={[styles.previewHeader, { backgroundColor: secondary }]}>
            {logoUri ? (
              <Image source={{ uri: logoUri }} style={{ width: 24, height: 24, borderRadius: 4 }} />
            ) : (
              <MaterialCommunityIcons name="trophy" size={20} color={primary} />
            )}
            <Text style={[styles.previewOrg, { color: primary }]}>{orgName || 'Your Org'}</Text>
          </View>
          <Text style={styles.previewTourn}>Sample Tournament</Text>
          <View style={[styles.previewBadge, { backgroundColor: secondary }]}>
            <Text style={{ color: primary, fontFamily: 'Manrope', fontSize: 11, fontWeight: '600' }}>IN PROGRESS</Text>
          </View>
        </Card>

        <Button variant="primary" fullWidth onPress={() => brandingMutation.mutate()}>
          {brandingMutation.isPending ? 'Saving...' : 'Save Branding'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  label: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1', marginBottom: 6, marginTop: 12 },
  hint: { fontFamily: 'Manrope', fontSize: 11, color: '#88938c', marginTop: 4, marginBottom: 8 },
  input: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14, marginBottom: 8 },
  logoBox: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  logoImg: { width: 80, height: 80 },
  colorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  colorSwatch: { width: 24, height: 24, borderRadius: 6 },
  colorLabel: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', width: 70 },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, marginBottom: 8 },
  previewOrg: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600' },
  previewTourn: { fontFamily: 'Newsreader', fontSize: 18, fontStyle: 'italic', color: '#dfe4dd', marginBottom: 6 },
  previewBadge: { alignSelf: 'flex-start', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
});
