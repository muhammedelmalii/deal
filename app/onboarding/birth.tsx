import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function BirthDetailsScreen() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  
  const handleContinue = () => {
    router.push('/onboarding/quiz');
  };
  
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.header}>
          <Text style={styles.title}>Birth Details</Text>
          <Text style={styles.subtitle}>
            Enter your birth information for astrological analysis
          </Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.inputWrapper}>
              <Calendar size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={date}
                onChangeText={setDate}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time of Birth</Text>
            <View style={styles.inputWrapper}>
              <Clock size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="HH:MM (24-hour format)"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Place of Birth</Text>
            <View style={styles.inputWrapper}>
              <MapPin size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="City, Country"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)} style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Your birth details help us calculate astrological influences on your personality.
            This information remains private and is only used for your color analysis.
          </Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(500)} style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => router.push('/onboarding/quiz')}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
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
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    marginBottom: 40,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
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