import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ScoreStepperCardProps {
  holeNumber: number;
  par: number;
  strokes: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ScoreStepperCard({
  holeNumber,
  par,
  strokes,
  onIncrement,
  onDecrement,
}: ScoreStepperCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Hole {holeNumber} · Par {par}</Text>
      <View style={styles.stepperRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onDecrement}
          disabled={strokes <= 1}
          style={[styles.btn, styles.minusBtn, strokes <= 1 && styles.btnDisabled]}
        >
          <Text style={[styles.btnText, strokes <= 1 && styles.btnTextDisabled]}>−</Text>
        </TouchableOpacity>
        <Text style={styles.strokesValue}>{strokes}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onIncrement}
          style={[styles.btn, styles.plusBtn]}
        >
          <Text style={styles.plusBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c211c',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3f4943',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Newsreader',
    fontStyle: 'italic',
    fontSize: 20,
    color: '#dfe4dd',
    marginBottom: 16,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  btnText: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    color: '#bec9c1',
  },
  btnTextDisabled: {
    color: '#3f4943',
  },
  plusBtnText: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    color: '#84d7af',
  },
  strokesValue: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 48,
    color: '#dfe4dd',
    minWidth: 70,
    textAlign: 'center',
  },
});
