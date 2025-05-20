import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedLogo from '@/components/AnimatedLogo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const taglines = [
    "Plan your day, your way.",
    "Meet your people anywhere.",
    "Discover who you really are.",
    "Experience life in full color.",
    "Connect with your true nature."
  ];
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        // Change text and fade in
        setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, [fadeAnim]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigateToDiscover = () => {
    router.push('/onboarding/photo');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateAsDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0a0a29', '#1f0a4c', '#2a0a3d']}
        style={styles.background}
      />
      <FloatingParticles />
      
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <AnimatedLogo />
          <Text style={styles.title}>Welcome to Deal</Text>
          <Text style={styles.subtitle}>Your Personalized Experience Engine</Text>
          
          <View style={styles.taglineContainer}>
            <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
              {taglines[taglineIndex]}
            </Animated.Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.discoverButton}
            onPress={navigateToDiscover}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Text style={styles.discoverButtonText}>🚀 Discover My Color</Text>
          </Pressable>
          
          <Pressable
            style={styles.loginButton}
            onPress={navigateToLogin}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Text style={styles.loginButtonText}>🔐 Login</Text>
          </Pressable>
          
          <Pressable
            style={styles.guestButton}
            onPress={navigateAsDashboard}
          >
            <Text style={styles.guestButtonText}>👻 Continue as Guest</Text>
          </Pressable>
        </View>
        
        <Text style={styles.footer}>Made with ♥ by AI | Powered by Supabase, OpenAI, and Google Maps</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: 'white',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    textAlign: 'center',
  },
  taglineContainer: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  tagline: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 20,
  },
  discoverButton: {
    backgroundColor: '#6c3ce9',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6c3ce9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  discoverButtonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  guestButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  footer: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
});