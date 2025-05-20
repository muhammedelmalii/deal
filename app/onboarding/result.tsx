import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FloatingParticles from '@/components/FloatingParticles';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, Easing } from 'react-native-reanimated';
import { Share, Users, Calendar } from 'lucide-react-native';

export default function ResultScreen() {
  const router = useRouter();
  const { setColorTheme } = useColorTheme();
  const [analyzing, setAnalyzing] = useState(true);
  const [colorDescription, setColorDescription] = useState('');
  
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    // Simulate analysis for a few seconds
    scale.value = withRepeat(withSequence(
      withTiming(1.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
    ), -1, true);
    
    rotate.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }), 
      -1, 
      false
    );
    
    // After 3 seconds, show the result
    const timer = setTimeout(() => {
      setAnalyzing(false);
      // Set the user's color to purple in this example
      setColorTheme('purple');
      setColorDescription('Deep & Intuitive');
      
      // Animation for result reveal
      scale.value = withTiming(1, { duration: 500 });
      opacity.value = withTiming(1, { duration: 1000 });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFindMatches = () => {
    router.replace('/matches');
  };
  
  const handlePlanDay = () => {
    router.replace('/planner');
  };
  
  const handleShareResult = () => {
    // Share functionality would be implemented here
  };
  
  const animatedOrbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotate.value}deg` }
      ],
    };
  });
  
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0a0a29', '#1f0a4c', '#2a0a3d']}
        style={styles.background}
      />
      <FloatingParticles />
      
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.orbContainer}>
          {analyzing ? (
            <>
              <Animated.View style={[styles.analyzingOrb, animatedOrbStyle]}>
                <LinearGradient
                  colors={['#6c3ce9', '#a13cef']}
                  style={styles.orbGradient}
                />
              </Animated.View>
              <Text style={styles.analyzingText}>Analyzing your cosmic energy...</Text>
            </>
          ) : (
            <>
              <Animated.View style={[styles.resultOrb, animatedOrbStyle]}>
                <LinearGradient
                  colors={['#6c3ce9', '#a13cef']}
                  style={styles.orbGradient}
                />
              </Animated.View>
              
              <Animated.View style={[styles.resultContent, animatedContentStyle]}>
                <Text style={styles.resultTitle}>You are 🟣 Purple</Text>
                <Text style={styles.resultSubtitle}>{colorDescription}</Text>
                <Text style={styles.resultDescription}>
                  Your intuitive nature allows you to connect deeply with others. 
                  You perceive the world through emotion and symbolism, making you 
                  naturally empathetic and creative.
                </Text>
                
                <View style={styles.actionsContainer}>
                  <Pressable style={styles.actionButton} onPress={handleFindMatches}>
                    <Users color="white" size={24} />
                    <Text style={styles.actionButtonText}>Find Matches</Text>
                  </Pressable>
                  
                  <Pressable style={styles.actionButton} onPress={handlePlanDay}>
                    <Calendar color="white" size={24} />
                    <Text style={styles.actionButtonText}>Plan My Day</Text>
                  </Pressable>
                  
                  <Pressable style={styles.shareButton} onPress={handleShareResult}>
                    <Share color="white" size={20} />
                    <Text style={styles.shareButtonText}>Share My Result</Text>
                  </Pressable>
                </View>
              </Animated.View>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzingOrb: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 32,
    shadowColor: '#6c3ce9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  resultOrb: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 32,
    shadowColor: '#6c3ce9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
  },
  analyzingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  resultContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  resultTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: '100%',
    marginBottom: 16,
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  shareButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});