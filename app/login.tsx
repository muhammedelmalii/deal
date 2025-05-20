import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { useUser } from '@/contexts/UserContext';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate login API call
    setTimeout(() => {
      login({
        id: '1',
        name: 'Demo User',
        email,
        color: 'Purple',
        colorDescription: 'Deep & Intuitive',
        photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      });
      setIsLoading(false);
      router.push('/(tabs)');
    }, 1500);
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to access your personalized experience</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)} style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupText}>Sign Up</Text>
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
  formContainer: {
    marginBottom: 40,
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6366F1',
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: 8,
  },
  signupText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#6366F1',
  },
});