import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Button } from './Button';

interface DisputeSubmitModalProps {
  visible: boolean;
  onClose: () => void;
  tournamentId: string;
  /** Pre-fill hole number if known */
  holeNumber?: number;
  /** Pre-fill recorded score if known */
  recordedScore?: number;
}

/**
 * Player dispute submission UI.
 * Can be triggered from round detail or leaderboard entry.
 * Calls POST /tournaments/:id/disputes
 */
export function DisputeSubmitModal({
  visible,
  onClose,
  tournamentId,
  holeNumber: initialHole,
  recordedScore: initialRecorded,
}: DisputeSubmitModalProps) {
  const [holeNumber, setHoleNumber] = useState(initialHole ? String(initialHole) : '');
  const [claimedScore, setClaimedScore] = useState('');
  const [recordedScore, setRecordedScore] = useState(initialRecorded ? String(initialRecorded) : '');

  const submitMutation = useMutation({
    mutationFn: () =>
      apiFetch(`/tournaments/${tournamentId}/disputes`, {
        method: 'POST',
        body: JSON.stringify({
          holeNumber: parseInt(holeNumber, 10),
          claimedScore: parseInt(claimedScore, 10),
          recordedScore: parseInt(recordedScore, 10),
        }),
      }),
    onSuccess: () => {
      Alert.alert('Submitted', 'Your dispute has been submitted for review');
      setHoleNumber('');
      setClaimedScore('');
      setRecordedScore('');
      onClose();
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const handleSubmit = () => {
    if (!holeNumber || !claimedScore || !recordedScore) {
      Alert.alert('Validation', 'Please fill in all fields');
      return;
    }
    submitMutation.mutate();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Dispute Score</Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <MaterialCommunityIcons name="close" size={24} color="#dfe4dd" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Hole Number</Text>
          <TextInput
            style={styles.input}
            value={holeNumber}
            onChangeText={setHoleNumber}
            keyboardType="numeric"
            placeholder="e.g. 7"
            placeholderTextColor="#88938c"
          />

          <Text style={styles.label}>Recorded Score</Text>
          <TextInput
            style={styles.input}
            value={recordedScore}
            onChangeText={setRecordedScore}
            keyboardType="numeric"
            placeholder="Score currently on record"
            placeholderTextColor="#88938c"
          />

          <Text style={styles.label}>Your Claimed Score</Text>
          <TextInput
            style={styles.input}
            value={claimedScore}
            onChangeText={setClaimedScore}
            keyboardType="numeric"
            placeholder="What you actually scored"
            placeholderTextColor="#88938c"
          />

          <Text style={styles.hint}>
            Your dispute will be reviewed by the tournament commissioner.
          </Text>

          <Button variant="primary" fullWidth onPress={handleSubmit}>
            {submitMutation.isPending ? 'Submitting...' : 'Submit Dispute'}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#1c211c', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, paddingBottom: 40 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sheetTitle: { fontFamily: 'Newsreader', fontSize: 22, fontStyle: 'italic', color: '#dfe4dd' },
  label: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  hint: { fontFamily: 'Manrope', fontSize: 12, color: '#88938c', marginTop: 12, marginBottom: 16 },
});
