import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Button } from '../../components/Button';

export function AnnouncementScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const [message, setMessage] = useState('');

  const sendMutation = useMutation({
    mutationFn: () =>
      apiFetch(`/tournaments/${tournamentId}/announce`, {
        method: 'POST',
        body: JSON.stringify({ message: message.trim() }),
      }),
    onSuccess: () => {
      Alert.alert('Sent', 'Announcement sent to all registered players');
      setMessage('');
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Announcement</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.textArea}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your announcement..."
          placeholderTextColor="#88938c"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <Text style={styles.hint}>This will be sent as a push notification to all registered players.</Text>
        <Button
          variant="primary"
          fullWidth
          onPress={() => {
            if (!message.trim()) { Alert.alert('Validation', 'Please enter a message'); return; }
            sendMutation.mutate();
          }}
        >
          {sendMutation.isPending ? 'Sending...' : 'Send Announcement'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  body: { padding: 16, gap: 12 },
  label: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1' },
  textArea: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, padding: 12, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14, minHeight: 140 },
  hint: { fontFamily: 'Manrope', fontSize: 12, color: '#88938c' },
});
