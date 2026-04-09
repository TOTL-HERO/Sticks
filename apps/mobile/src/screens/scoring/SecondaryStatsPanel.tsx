import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SecondaryStatsPanelProps {
  putts: number | null;
  fairwayHit: boolean | null;
  gir: boolean | null;
  onPuttsChange: (delta: number) => void;
  onFairwayToggle: () => void;
  onGirToggle: () => void;
}

export function SecondaryStatsPanel({
  putts,
  fairwayHit,
  gir,
  onPuttsChange,
  onFairwayToggle,
  onGirToggle,
}: SecondaryStatsPanelProps) {
  const puttsValue = putts ?? 0;

  return (
    <View style={styles.container}>
      {/* Putts stepper */}
      <View style={styles.puttsWrap}>
        <Text style={styles.label}>Putts</Text>
        <View style={styles.puttsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPuttsChange(-1)}
            disabled={puttsValue <= 0}
            style={[styles.smallBtn, styles.minusBtn, puttsValue <= 0 && styles.btnDisabled]}
          >
            <Text style={[styles.smallBtnText, puttsValue <= 0 && styles.btnTextDisabled]}>−</Text>
          </TouchableOpacity>
          <Text style={styles.puttsValue}>{putts !== null ? puttsValue : '–'}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPuttsChange(1)}
            style={[styles.smallBtn, styles.plusBtn]}
          >
            <Text style={styles.plusBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fairway Hit toggle */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onFairwayToggle}
        style={[styles.chip, fairwayHit === true && styles.chipActive]}
      >
        <Text style={[styles.chipText, fairwayHit === true && styles.chipTextActive]}>FW</Text>
      </TouchableOpacity>

      {/* GIR toggle */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onGirToggle}
        style={[styles.chip, gir === true && styles.chipActive]}
      >
        <Text style={[styles.chipText, gir === true && styles.chipTextActive]}>GIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  puttsWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    color: '#bec9c1',
  },
  puttsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusBtn: {
    backgroundColor: '#101511',
    borderWidth: 1,
    borderColor: '#3f4943',
  },
  plusBtn: {
    backgroundColor: '#006747',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  smallBtnText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#bec9c1',
  },
  btnTextDisabled: {
    color: '#3f4943',
  },
  plusBtnText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#84d7af',
  },
  puttsValue: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 18,
    color: '#dfe4dd',
    minWidth: 24,
    textAlign: 'center',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3f4943',
    backgroundColor: '#101511',
  },
  chipActive: {
    backgroundColor: '#006747',
    borderColor: '#84d7af',
  },
  chipText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    color: '#bec9c1',
  },
  chipTextActive: {
    color: '#84d7af',
  },
});
