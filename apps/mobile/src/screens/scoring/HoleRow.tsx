import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getScoreColor } from '../../utils/getScoreColor';

interface HoleRowProps {
  holeNumber: number;
  par: number;
  strokes: number;
  isCurrentHole: boolean;
  onPress: (holeNumber: number) => void;
}

export function HoleRow({ holeNumber, par, strokes, isCurrentHole, onPress }: HoleRowProps) {
  const scored = strokes !== par;
  const color = getScoreColor(strokes, par);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(holeNumber)}
      style={[
        styles.row,
        { backgroundColor: color + '26' }, // 15% opacity hex
        isCurrentHole && styles.currentRow,
      ]}
    >
      <View style={styles.holeNumberWrap}>
        <Text style={styles.holeNumber}>{holeNumber}</Text>
      </View>
      <Text style={styles.parText}>Par {par}</Text>
      <View style={styles.right}>
        <Text style={[styles.strokesText, { color }]}>{strokes}</Text>
        {scored && <View style={[styles.indicator, { backgroundColor: color }]} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentRow: {
    borderWidth: 1,
    borderColor: '#84d7af',
  },
  holeNumberWrap: {
    width: 28,
    alignItems: 'center',
  },
  holeNumber: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 14,
    color: '#dfe4dd',
  },
  parText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: '#bec9c1',
    marginLeft: 12,
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  strokesText: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
