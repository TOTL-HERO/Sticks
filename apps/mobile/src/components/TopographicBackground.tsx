import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TopographicBackgroundProps {
  opacity?: number;
}

export function TopographicBackground({ opacity = 0.08 }: TopographicBackgroundProps) {
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} viewBox="0 0 400 800">
        <Path d="M-20 100 Q80 60 160 100 T340 80 T520 100" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity} />
        <Path d="M-20 160 Q100 120 200 160 T400 140 T520 160" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity} />
        <Path d="M-20 240 Q60 200 180 240 T380 220 T520 240" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.8} />
        <Path d="M-20 320 Q120 280 220 320 T420 300 T520 320" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.8} />
        <Path d="M-20 400 Q80 360 160 400 T360 380 T520 400" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.6} />
        <Path d="M-20 480 Q100 440 200 480 T400 460 T520 480" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.6} />
        <Path d="M-20 560 Q60 520 180 560 T380 540 T520 560" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.5} />
        <Path d="M-20 640 Q120 600 220 640 T420 620 T520 640" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.5} />
        <Path d="M-20 720 Q80 680 160 720 T360 700 T520 720" stroke="#84d7af" strokeWidth={0.8} fill="none" opacity={opacity * 0.4} />
        <Path d="M120 180 Q160 140 220 160 Q260 180 240 220 Q200 260 140 240 Q100 220 120 180 Z" stroke="#84d7af" strokeWidth={0.6} fill="none" opacity={opacity * 0.7} />
        <Path d="M260 420 Q300 380 360 400 Q400 420 380 460 Q340 500 280 480 Q240 460 260 420 Z" stroke="#84d7af" strokeWidth={0.6} fill="none" opacity={opacity * 0.5} />
        <Path d="M60 540 Q100 500 160 520 Q200 540 180 580 Q140 620 80 600 Q40 580 60 540 Z" stroke="#84d7af" strokeWidth={0.6} fill="none" opacity={opacity * 0.4} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
