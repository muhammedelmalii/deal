import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface FloatingParticlesProps {
  count?: number;
  particleColor?: string;
}

export default function FloatingParticles({ 
  count = 20,
  particleColor = 'white'
}: FloatingParticlesProps) {
  // Create an array of particles
  const particles = Array.from({ length: count }, (_, i) => i);
  
  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((id) => (
        <Particle key={id} id={id} color={particleColor} />
      ))}
    </View>
  );
}

interface ParticleProps {
  id: number;
  color: string;
}

function Particle({ id, color }: ParticleProps) {
  // Random initial positions
  const initialX = Math.random() * 100; // % of screen width
  const initialY = Math.random() * 100; // % of screen height
  
  // Animation values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(Math.random() * 0.5 + 0.5); // Between 0.5 and 1
  const opacity = useSharedValue(Math.random() * 0.6 + 0.2); // Between 0.2 and 0.8
  
  useEffect(() => {
    // Create random animation parameters
    const xDuration = 10000 + Math.random() * 20000; // Between 10s and 30s
    const yDuration = 10000 + Math.random() * 20000; // Between 10s and 30s
    const delay = Math.random() * 5000; // Random delay up to 5s
    
    // X movement
    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(Math.random() * 20 - 10, { duration: xDuration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        -1, // Infinite repeats
        true // Reverse each time
      )
    );
    
    // Y movement
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(Math.random() * 20 - 10, { duration: yDuration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        -1, // Infinite repeats
        true // Reverse each time
      )
    );
    
    // Opacity and scale pulsing
    opacity.value = withRepeat(
      withTiming(Math.random() * 0.5 + 0.3, { duration: 3000 + Math.random() * 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1, // Infinite repeats
      true // Reverse each time
    );
    
    scale.value = withRepeat(
      withTiming(Math.random() * 0.3 + 0.7, { duration: 2000 + Math.random() * 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1, // Infinite repeats
      true // Reverse each time
    );
  }, []);
  
  // Create animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });
  
  // Calculate size based on id (for variety)
  const size = 1 + (id % 3); // 1px, 2px, or 3px
  
  return (
    <Animated.View 
      style={[
        styles.particle, 
        animatedStyle, 
        { 
          left: `${initialX}%`, 
          top: `${initialY}%`,
          width: size,
          height: size,
          backgroundColor: color
        }
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
});