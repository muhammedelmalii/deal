import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export default function SegmentedControl({ values, selectedIndex, onChange }: SegmentedControlProps) {
  const segmentWidth = 100 / values.length;
  
  // Animation for the selection indicator
  const translateX = useSharedValue(selectedIndex * segmentWidth);
  
  // Update the animation when the selected index changes
  const updatePosition = (index: number) => {
    translateX.value = withSpring(index * segmentWidth);
    onChange(index);
  };
  
  // Animated style for the indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: `${translateX.value}%` }],
      width: `${segmentWidth}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.selectionIndicator, indicatorStyle]} />
      
      {values.map((value, index) => (
        <Pressable
          key={index}
          style={[styles.segment, { width: `${segmentWidth}%` }]}
          onPress={() => updatePosition(index)}
        >
          <Text 
            style={[
              styles.segmentText, 
              index === selectedIndex && styles.activeSegmentText
            ]}
          >
            {value}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
    position: 'relative',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 1,
  },
  segmentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeSegmentText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});