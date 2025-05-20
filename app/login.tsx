import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FloatingParticles from '@/components/FloatingParticles';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Here you would implement real authentication
    // For now we just navigate to the dashboard
    router.replace('/dashboard');
  };
  
  const goBack = () => {
    router.back();
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
        <Pressable onPress={goBack} style={styles.backButton}>
          <ArrowLeft color="white" size={24} />
        </Pressable>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
            />
          </View>
          
          <Pressable style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>
          
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={['#6c3ce9', '#8c4fe9']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradient}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </Pressable>
          
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Pressable>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
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
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loginButton: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 24,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6c3ce9',
  },
});