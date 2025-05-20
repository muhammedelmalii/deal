import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FloatingParticles from '@/components/FloatingParticles';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, ChevronRight } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

export default function PhotoUploadScreen() {
  const router = useRouter();
  const [photoSelected, setPhotoSelected] = useState(false);
  const [photoUri, setPhotoUri] = useState('https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  
  const handleCameraPress = () => {
    // In a real app, this would open the camera
    // For simulation, we'll just set a photo
    setPhotoSelected(true);
  };
  
  const handleUploadPress = () => {
    // In a real app, this would open the image picker
    // For simulation, we'll just set a photo
    setPhotoSelected(true);
  };
  
  const goToNextStep = () => {
    router.push('/onboarding/birthinfo');
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
        <View style={styles.headerContainer}>
          <ProgressBar currentStep={1} totalSteps={5} />
          <Text style={styles.stepText}>Step 1 of 5</Text>
        </View>
        
        <View style={styles.contentSection}>
          <Text style={styles.title}>Add Your Photo</Text>
          <Text style={styles.subtitle}>
            This helps us create your personalized color profile
          </Text>
          
          {photoSelected ? (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photoUri }} style={styles.photo} />
              <Pressable style={styles.retakeButton} onPress={() => setPhotoSelected(false)}>
                <Text style={styles.retakeButtonText}>Change Photo</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              <Pressable style={styles.optionButton} onPress={handleCameraPress}>
                <Camera color="white" size={40} />
                <Text style={styles.optionButtonText}>Take Photo</Text>
              </Pressable>
              
              <Pressable style={styles.optionButton} onPress={handleUploadPress}>
                <Upload color="white" size={40} />
                <Text style={styles.optionButtonText}>Upload Photo</Text>
              </Pressable>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.nextButton, !photoSelected && styles.nextButtonDisabled]}
            onPress={goToNextStep}
            disabled={!photoSelected}
          >
            <LinearGradient
              colors={['#6c3ce9', '#8c4fe9']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.buttonGradient}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
              <ChevronRight color="white" size={20} />
            </LinearGradient>
          </Pressable>
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
  },
  stepText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  contentSection: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: '80%',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
    marginTop: 16,
  },
  photoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'white',
  },
  retakeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
  },
  retakeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  nextButton: {
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
    marginRight: 8,
  },
});