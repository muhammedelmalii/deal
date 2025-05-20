import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
};

export function Slider({ 
  value, 
  onValueChange, 
  minimumValue, 
  maximumValue, 
  step = 1
}: SliderProps) {
  const sliderWidth = useSharedValue(0);
  const thumbPosition = useSharedValue(0);
  
  useEffect(() => {
    // Calculate thumb position from value
    const range = maximumValue - minimumValue;
    const percentage = (value - minimumValue) / range;
    thumbPosition.value = percentage;
  }, [value, minimumValue, maximumValue]);
  
  const onLayout = (event) => {
    sliderWidth.value = event.nativeEvent.layout.width;
  };
  
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      // Calculate new position
      let newPosition = event.translationX / sliderWidth.value + thumbPosition.value;
      
      // Clamp between 0 and 1
      newPosition = Math.max(0, Math.min(1, newPosition));
      
      // Calculate new value with step
      const range = maximumValue - minimumValue;
      let newValue = minimumValue + (range * newPosition);
      
      // Apply step if needed
      if (step) {
        newValue = Math.round(newValue / step) * step;
        
        // Recalculate position based on stepped value
        newPosition = (newValue - minimumValue) / range;
      }
      
      // Update position and notify parent
      thumbPosition.value = newPosition;
      onValueChange(Math.min(maximumValue, Math.max(minimumValue, newValue)));
    })
    .onEnd(() => {
      // Animation to settle thumb into exact position
      const range = maximumValue - minimumValue;
      const steppedValue = Math.round((minimumValue + (range * thumbPosition.value)) / step) * step;
      const exactPosition = (steppedValue - minimumValue) / range;
      
      thumbPosition.value = withTiming(exactPosition, { duration: 100 });
    });
  
  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: thumbPosition.value * sliderWidth.value }],
    };
  });
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${thumbPosition.value * 100}%`,
    };
  });
  
  return (
    <GestureHandlerRootView>
      <View style={styles.container} onLayout={onLayout}>
        <View style={styles.track} />
        <Animated.View style={[styles.progress, progressStyle]} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progress: {
    height: 4,
    backgroundColor: '#6366F1',
    borderRadius: 2,
    position: 'absolute',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 10,
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});