import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FloatingParticles from '@/components/FloatingParticles';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, ArrowLeft } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

export default function BirthInfoScreen() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  
  const goBack = () => {
    router.back();
  };
  
  const goToNextStep = () => {
    // Normally we'd validate the inputs first
    router.push('/onboarding/quiz');
  };
  
  const isFormValid = birthDate && birthTime && birthLocation;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0a0a29', '#1f0a4c', '#2a0a3d']}
        style={styles.background}
      />
      <FloatingParticles />
      
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Pressable onPress={goBack} style={styles.backButton}>
              <ArrowLeft color="white" size={20} />
            </Pressable>
            <View style={styles.progressContainer}>
              <ProgressBar currentStep={2} totalSteps={5} />
              <Text style={styles.stepText}>Step 2 of 5</Text>
            </View>
          </View>
          
          <View style={styles.contentSection}>
            <Text style={styles.title}>Birth Information</Text>
            <Text style={styles.subtitle}>
              Your cosmic alignment is influenced by the time and place of your birth
            </Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Birth Date</Text>
                <TextInput
                  style={styles.input}
                  value={birthDate}
                  onChangeText={setBirthDate}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Birth Time (if known)</Text>
                <TextInput
                  style={styles.input}
                  value={birthTime}
                  onChangeText={setBirthTime}
                  placeholder="HH:MM AM/PM"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Birth Location</Text>
                <TextInput
                  style={styles.input}
                  value={birthLocation}
                  onChangeText={setBirthLocation}
                  placeholder="City, Country"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
            </View>
            
            <Text style={styles.note}>
              Your information is private and used only for your personal experience
            </Text>
          </View>
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
            onPress={goToNextStep}
            disabled={!isFormValid}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  contentSection: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  note: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
  },
  buttonContainer: {
    paddingVertical: 16,
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