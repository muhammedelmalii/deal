import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { ColorTheme } from '@/types/theme';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';

interface RangeSliderProps {
  min: number;
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
  colorTheme: ColorTheme;
}

export default function RangeSlider({ min, max, values, onChange, colorTheme }: RangeSliderProps) {
  const sliderWidth = 300; // Fixed width for calculations
  const thumbSize = 24;
  
  // Calculate initial positions based on values
  const calculatePosition = (value: number) => {
    return ((value - min) / (max - min)) * sliderWidth;
  };
  
  const calculateValue = (position: number) => {
    const value = min + (position / sliderWidth) * (max - min);
    return Math.round(value);
  };
  
  // Shared values for thumb positions
  const leftThumbPos = useSharedValue(calculatePosition(values[0]));
  const rightThumbPos = useSharedValue(calculatePosition(values[1]));
  
  // Gesture handlers
  const leftThumbGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newPos = Math.max(0, Math.min(rightThumbPos.value - thumbSize, leftThumbPos.value + e.translationX));
      leftThumbPos.value = newPos;
      runOnJS(onChange)([calculateValue(newPos), values[1]]);
    });
  
  const rightThumbGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newPos = Math.min(sliderWidth, Math.max(leftThumbPos.value + thumbSize, rightThumbPos.value + e.translationX));
      rightThumbPos.value = newPos;
      runOnJS(onChange)([values[0], calculateValue(newPos)]);
    });
  
  // Animated styles for thumbs
  const leftThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: leftThumbPos.value }],
    };
  });
  
  const rightThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: rightThumbPos.value }],
    };
  });
  
  // Animated style for selected area
  const selectedAreaStyle = useAnimatedStyle(() => {
    return {
      left: leftThumbPos.value + thumbSize / 2,
      right: sliderWidth - rightThumbPos.value - thumbSize / 2,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.trackContainer}>
        <View style={styles.track} />
        <Animated.View 
          style={[
            styles.selectedArea, 
            selectedAreaStyle, 
            { backgroundColor: colorTheme.primary }
          ]} 
        />
      </View>
      
      <GestureDetector gesture={leftThumbGesture}>
        <Animated.View 
          style={[
            styles.thumb, 
            leftThumbStyle, 
            { backgroundColor: colorTheme.primary }
          ]} 
        />
      </GestureDetector>
      
      <GestureDetector gesture={rightThumbGesture}>
        <Animated.View 
          style={[
            styles.thumb, 
            rightThumbStyle, 
            { backgroundColor: colorTheme.primary }
          ]} 
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
  },
  trackContainer: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  track: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  selectedArea: {
    position: 'absolute',
    height: '100%',
    top: 0,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 8,
    marginTop: -10,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});