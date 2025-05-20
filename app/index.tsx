import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Star } from 'lucide-react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();
  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
    'Poppins-Medium': 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
    'Poppins-Regular': 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2',
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <View style={styles.starsContainer}>
        {[...Array(20)].map((_, i) => (
          <Animated.View 
            key={i}
            entering={FadeIn.delay(i * 100).duration(1000)}
            style={[
              styles.star,
              { 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                transform: [{ scale: Math.random() * 0.5 + 0.5 }]
              }
            ]}
          >
            <Star size={16} color="#FFFFFF" />
          </Animated.View>
        ))}
      </View>
      
      <View style={styles.content}>
        <Animated.View 
          entering={FadeIn.duration(1000)}
          style={styles.logoContainer}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Deal</Text>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(500).duration(1000)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Welcome to Deal</Text>
          <Text style={styles.subtitle}>Your Personalized Experience Engine</Text>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(1000).duration(1000)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/onboarding')}
          >
            <Text style={styles.primaryButtonText}>Discover My Color</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.textButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.textButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  textButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  textButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});