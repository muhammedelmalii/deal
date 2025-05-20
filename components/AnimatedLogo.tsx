import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function AnimatedLogo() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const innerRotation = useSharedValue(0);
  
  useEffect(() => {
    // Outer circle rotation
    rotation.value = withRepeat(
      withTiming(360, { 
        duration: 20000, 
        easing: Easing.linear 
      }), 
      -1, // Infinite repetition
      false // No need to reverse
    );
    
    // Inner circle rotation (opposite direction)
    innerRotation.value = withRepeat(
      withTiming(-360, { 
        duration: 12000, 
        easing: Easing.linear 
      }), 
      -1, 
      false
    );
    
    // Pulse animation
    scale.value = withRepeat(
      withTiming(1.1, { 
        duration: 2000, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      }),
      -1, // Infinite repetition
      true // Reverse animation (pulse)
    );
  }, []);
  
  const outerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
    };
  });
  
  const innerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${innerRotation.value}deg` }
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.outerCircle, outerCircleStyle]}>
        {/* Outer circle particles */}
        <View style={[styles.particle, styles.particle1]} />
        <View style={[styles.particle, styles.particle2]} />
        <View style={[styles.particle, styles.particle3]} />
        <View style={[styles.particle, styles.particle4]} />
        <View style={[styles.particle, styles.particle5]} />
      </Animated.View>
      
      <Animated.View style={[styles.innerCircle, innerCircleStyle]}>
        {/* Inner circle mini-particles */}
        <View style={[styles.miniParticle, styles.miniParticle1]} />
        <View style={[styles.miniParticle, styles.miniParticle2]} />
        <View style={[styles.miniParticle, styles.miniParticle3]} />
      </Animated.View>
      
      <View style={styles.centerCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
  },
  centerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 60, 233, 0.8)',
    position: 'absolute',
    shadowColor: '#6c3ce9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  particle1: {
    width: 8,
    height: 8,
    top: 10,
    left: 56,
  },
  particle2: {
    width: 6,
    height: 6,
    top: 40,
    right: 10,
  },
  particle3: {
    width: 10,
    height: 10,
    bottom: 20,
    right: 20,
  },
  particle4: {
    width: 7,
    height: 7,
    bottom: 30,
    left: 15,
  },
  particle5: {
    width: 5,
    height: 5,
    top: 30,
    left: 20,
  },
  miniParticle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
  },
  miniParticle1: {
    width: 4,
    height: 4,
    top: 15,
    right: 20,
  },
  miniParticle2: {
    width: 3,
    height: 3,
    bottom: 20,
    left: 25,
  },
  miniParticle3: {
    width: 4,
    height: 4,
    bottom: 30,
    right: 30,
  },
});