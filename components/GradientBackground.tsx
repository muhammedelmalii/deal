import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

type GradientBackgroundProps = {
  children: React.ReactNode;
};

export function GradientBackground({ children }: GradientBackgroundProps) {
  const [stars, setStars] = useState([]);
  const animationProgress = useRef(0).current;
  
  useEffect(() => {
    // Generate random stars
    const newStars = [];
    for (let i = 0; i < 30; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        size: Math.random() * 2 + 1,
        animationDuration: Math.random() * 3000 + 2000,
      });
    }
    setStars(newStars);
  }, []);
  
  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <View style={styles.starsContainer}>
        {stars.map((star) => (
          <Animated.View
            key={star.id}
            style={[
              styles.star,
              {
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                width: star.size,
                height: star.size,
              },
            ]}
          />
        ))}
      </View>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
});