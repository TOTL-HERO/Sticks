import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { apiFetch } from '../../lib/api';

type HandicapOption = 'ghin' | 'manual' | 'none';

interface HandicapStepProps {
  data: { handicapOption: HandicapOption; ghinNumber: string; manualHandicap: string; ghinIndex: number | null };
  onChange: (data: Partial<HandicapStepProps['data']>) => void;
}

export function HandicapStep({ data, onChange }: HandicapStepProps) {
  const [lookingUp, setLookingUp] = useState(false);

  const lookupGhin = async () => {
    if (!data.ghinNumber.trim()) { Alert.alert('Enter GHIN Number', 'Please enter your GHIN number to look up.'); return; }
    setLookingUp(true);
    try {
      const res = await apiFetch<{ handicapIndex: number }>('/ghin/lookup', { method: 'POST', body: JSON.stringify({ ghinNumber: data.ghinNumber }) });
      onChange({ ghinIndex: res.handicapIndex });
      Alert.alert('Success', `Handicap index: ${res.handicapIndex}`);
    } catch { Alert.alert('Lookup Failed', 'Could not retrieve GHIN handicap. Try again or enter manually.'); }
    finally { setLookingUp(false); }
  };

  const selectOption = (option: HandicapOption) => onChange({ handicapOption: option });

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>Your Handicap</Text>
      <Text style={styles.subheading}>How would you like to set up your handicap?</Text>

      <View style={{ gap: 16 }}>
        {/* GHIN Option */}
        <TouchableOpacity onPress={() => selectOption('ghin')} activeOpacity={0.8}>
          <View style={[styles.card, data.handicapOption === 'ghin' ? styles.cardGhinSelected : styles.cardDefault]}>
            <View style={styles.goldAccent} />
            <View style={styles.cardHeaderRow}>
              <View style={styles.radioRow}>
                <View style={[styles.radio, { borderColor: data.handicapOption === 'ghin' ? '#e9c349' : '#88938c' }]}>
                  {data.handicapOption === 'ghin' && <View style={[styles.radioDot, { backgroundColor: '#e9c349' }]} />}
                </View>
                <Text style={styles.cardTitle}>Link my GHIN Handicap</Text>
              </View>
              <MaterialCommunityIcons name="shield-check" size={20} color="#e9c349" />
            </View>
            <Text style={styles.cardDesc}>Verified official USGA handicap index</Text>

            {data.handicapOption === 'ghin' && (
              <View style={{ gap: 12 }}>
                <TextInput
                  value={data.ghinNumber}
                  onChangeText={(text) => onChange({ ghinNumber: text })}
                  placeholder="Enter GHIN Number"
                  keyboardType="number-pad"
                  style={styles.input}
                  placeholderTextColor="#3f4943"
                />
                <TouchableOpacity onPress={lookupGhin} disabled={lookingUp}>
                  <View style={[styles.lookupBtn, { opacity: lookingUp ? 0.6 : 1 }]}>
                    {lookingUp ? (
                      <ActivityIndicator size="small" color="#3c2f00" />
                    ) : (
                      <Text style={styles.lookupBtnText}>Look Up Handicap</Text>
                    )}
                  </View>
                </TouchableOpacity>
                {data.ghinIndex !== null && (
                  <View style={styles.successBadge}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#84d7af" />
                    <Text style={styles.successText}>Handicap Index: {data.ghinIndex}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Manual Entry */}
        <TouchableOpacity onPress={() => selectOption('manual')} activeOpacity={0.8}>
          <View style={[styles.card, data.handicapOption === 'manual' ? styles.cardManualSelected : styles.cardDefault]}>
            <View style={[styles.radioRow, { marginBottom: 8 }]}>
              <View style={[styles.radio, { borderColor: data.handicapOption === 'manual' ? '#84d7af' : '#88938c' }]}>
                {data.handicapOption === 'manual' && <View style={[styles.radioDot, { backgroundColor: '#84d7af' }]} />}
              </View>
              <Text style={styles.cardTitle}>Enter Manually</Text>
            </View>
            <Text style={styles.cardDesc}>Enter your handicap index (0–54)</Text>

            {data.handicapOption === 'manual' && (
              <TextInput
                value={data.manualHandicap}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9.]/g, '');
                  const num = parseFloat(cleaned);
                  if (cleaned === '' || (num >= 0 && num <= 54)) onChange({ manualHandicap: cleaned });
                }}
                placeholder="e.g. 12.4"
                keyboardType="decimal-pad"
                style={styles.input}
                placeholderTextColor="#3f4943"
              />
            )}
          </View>
        </TouchableOpacity>

        {/* No Handicap */}
        <TouchableOpacity onPress={() => selectOption('none')} activeOpacity={0.8}>
          <View style={{ alignItems: 'center', paddingVertical: 12 }}>
            <Text style={styles.skipText}>No handicap yet — skip this step</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic', color: '#dfe4dd', marginBottom: 8 },
  subheading: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginBottom: 24 },
  card: { backgroundColor: '#1c211c', borderRadius: 12, padding: 16, position: 'relative', overflow: 'hidden' },
  cardDefault: { borderWidth: 1, borderColor: '#3f4943' },
  cardGhinSelected: { borderWidth: 2, borderColor: '#e9c349' },
  cardManualSelected: { borderWidth: 2, borderColor: '#84d7af' },
  goldAccent: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, backgroundColor: '#e9c349' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  cardTitle: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#dfe4dd' },
  cardDesc: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginBottom: 12 },
  input: { backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 13 },
  lookupBtn: { backgroundColor: '#e9c349', borderRadius: 8, paddingVertical: 8, alignItems: 'center', justifyContent: 'center' },
  lookupBtnText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '700', color: '#3c2f00' },
  successBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(132,215,175,0.1)', padding: 8, borderRadius: 8 },
  successText: { fontFamily: 'Manrope', fontSize: 13, color: '#84d7af' },
  skipText: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', textDecorationLine: 'underline' },
});
