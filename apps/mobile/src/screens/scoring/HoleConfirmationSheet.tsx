import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = 360;

interface HoleConfirmationData {
  strokes: number;
  putts: number | null;
  fairwayHit: boolean | null;
  gir: boolean | null;
}

interface HoleConfirmationSheetProps {
  visible: boolean;
  holeNumber: number;
  par: number;
  detectedShotCount: number;
  onSave: (data: HoleConfirmationData) => void;
  onDismiss: () => void;
}

export function HoleConfirmationSheet({
  visible,
  holeNumber,
  par,
  detectedShotCount,
  onSave,
  onDismiss,
}: HoleConfirmationSheetProps) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const [strokes, setStrokes] = useState(detectedShotCount || par);
  const [putts, setPutts] = useState<number | null>(null);
  const [fairwayHit, setFairwayHit] = useState<boolean | null>(null);
  const [gir, setGir] = useState<boolean | null>(null);

  useEffect(() => {
    if (visible) {
      setStrokes(detectedShotCount > 0 ? detectedShotCount : par);
      setPutts(null);
      setFairwayHit(null);
      setGir(null);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, detectedShotCount, par]);

  const handleSave = () => {
    onSave({ strokes, putts, fairwayHit, gir });
  };

  const puttsValue = putts ?? 0;

  return (
    <Animated.View
      style={[
        styles.sheet,
        { transform: [{ translateY }] },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      {/* Drag handle */}
      <View style={styles.handleWrap}>
        <View style={styles.handle} />
      </View>

      {/* Shot count text */}
      <Text style={styles.shotCountText}>
        {detectedShotCount > 0
          ? `${detectedShotCount} shot${detectedShotCount !== 1 ? 's' : ''} detected`
          : 'No shots detected'}
      </Text>

      {/* Strokes stepper */}
      <View style={styles.stepperRow}>
        <Text style={styles.label}>Strokes</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setStrokes((s) => Math.max(1, s - 1))}
            disabled={strokes <= 1}
            style={[styles.btn, styles.minusBtn, strokes <= 1 && styles.btnDisabled]}
          >
            <Text style={[styles.btnText, strokes <= 1 && styles.btnTextDisabled]}>−</Text>
          </TouchableOpacity>
          <Text style={styles.valueText}>{strokes}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setStrokes((s) => s + 1)}
            style={[styles.btn, styles.plusBtn]}
          >
            <Text style={styles.plusBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Putts stepper */}
      <View style={styles.stepperRow}>
        <Text style={styles.label}>Putts</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPutts((p) => Math.max(0, (p ?? 0) - 1))}
            disabled={puttsValue <= 0}
            style={[styles.btn, styles.minusBtn, puttsValue <= 0 && styles.btnDisabled]}
          >
            <Text style={[styles.btnText, puttsValue <= 0 && styles.btnTextDisabled]}>−</Text>
          </TouchableOpacity>
          <Text style={styles.valueTextSm}>{putts !== null ? puttsValue : '–'}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPutts((p) => (p ?? 0) + 1)}
            style={[styles.btn, styles.plusBtn]}
          >
            <Text style={styles.plusBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FW + GIR toggles */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFairwayHit((v) => (v === true ? false : true))}
          style={[styles.chip, fairwayHit === true && styles.chipActive]}
        >
          <Text style={[styles.chipText, fairwayHit === true && styles.chipTextActive]}>FW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setGir((v) => (v === true ? false : true))}
          style={[styles.chip, gir === true && styles.chipActive]}
        >
          <Text style={[styles.chipText, gir === true && styles.chipTextActive]}>GIR</Text>
        </TouchableOpacity>
      </View>

      {/* Save button */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleSave} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: '#1c211c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#3f4943',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  handleWrap: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3f4943',
  },
  shotCountText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    color: '#84d7af',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '600',
    color: '#dfe4dd',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#bec9c1',
  },
  btnTextDisabled: {
    color: '#3f4943',
  },
  plusBtnText: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#84d7af',
  },
  valueText: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 28,
    color: '#dfe4dd',
    minWidth: 40,
    textAlign: 'center',
  },
  valueTextSm: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 20,
    color: '#dfe4dd',
    minWidth: 30,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
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
  saveBtn: {
    backgroundColor: '#006747',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#84d7af',
  },
});
