import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { ArrowLeft, Camera, Upload, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Platform } from 'react-native';

export default function FaceUploadScreen() {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleSelectPhoto = () => {
    // Simulate selecting photo
    setPhoto('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  };
  
  const handleCapturePhoto = () => {
    // Simulate camera capture
    setPhoto('https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  };
  
  const handleContinue = () => {
    setIsAnalyzing(true);
    
    // Simulate photo analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push('/onboarding/birth');
    }, 2000);
  };
  
  return (
    <GradientBackground>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.header}>
          <Text style={styles.title}>Upload Your Photo</Text>
          <Text style={styles.subtitle}>
            We'll analyze your features to help determine your color profile
          </Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.2)', 'rgba(99, 102, 241, 0.1)']}
              style={styles.photoPlaceholder}
            >
              <Camera size={48} color="rgba(255, 255, 255, 0.5)" />
              <Text style={styles.placeholderText}>Your photo will appear here</Text>
            </LinearGradient>
          )}
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)} style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleSelectPhoto}
          >
            <Upload size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Upload Photo</Text>
          </TouchableOpacity>
          
          {Platform.OS !== 'web' && (
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleCapturePhoto}
            >
              <Camera size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>Take Photo</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(500)} style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              !photo && styles.disabledButton
            ]} 
            onPress={handleContinue}
            disabled={!photo || isAnalyzing}
          >
            <Text style={styles.continueButtonText}>
              {isAnalyzing ? 'Analyzing...' : 'Continue'}
            </Text>
            {!isAnalyzing && <ArrowRight size={20} color="#FFFFFF" />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => router.push('/onboarding/birth')}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginTop: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  photo: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: 'rgba(99, 102, 241, 0.5)',
  },
  photoPlaceholder: {
    width: 240,
    height: 240,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.5)',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    maxWidth: 160,
    marginTop: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    gap: 8,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.5)',
    shadowOpacity: 0,
  },
  continueButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});