import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FloatingParticles from '@/components/FloatingParticles';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, ArrowLeft } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';
import { useState, useRef } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const quizQuestions = [
  {
    question: "How do you recharge your energy?",
    options: [
      { emoji: "🧘", text: "Quiet time alone", value: "introvert" },
      { emoji: "🎉", text: "Being with friends", value: "extrovert" },
      { emoji: "🌳", text: "Time in nature", value: "nature" },
      { emoji: "📚", text: "Learning new things", value: "curious" }
    ]
  },
  {
    question: "When making decisions, you rely on:",
    options: [
      { emoji: "❤️", text: "Your feelings", value: "emotional" },
      { emoji: "🧠", text: "Logical analysis", value: "logical" },
      { emoji: "🔮", text: "Your intuition", value: "intuitive" },
      { emoji: "👥", text: "Advice from others", value: "social" }
    ]
  },
  {
    question: "Which activities do you enjoy most?",
    options: [
      { emoji: "🎨", text: "Creative expression", value: "creative" },
      { emoji: "🧩", text: "Solving problems", value: "analytical" },
      { emoji: "🤝", text: "Helping others", value: "empathetic" },
      { emoji: "🏆", text: "Achieving goals", value: "driven" }
    ]
  },
  {
    question: "In a group, you are usually:",
    options: [
      { emoji: "👑", text: "The leader", value: "leader" },
      { emoji: "💡", text: "The idea person", value: "innovator" },
      { emoji: "🤗", text: "The supportive one", value: "supporter" },
      { emoji: "🔍", text: "The analyzer", value: "analyzer" }
    ]
  },
  {
    question: "Your ideal environment is:",
    options: [
      { emoji: "🌊", text: "Calm and peaceful", value: "peaceful" },
      { emoji: "✨", text: "Vibrant and energetic", value: "energetic" },
      { emoji: "🔄", text: "Dynamic and changing", value: "adaptive" },
      { emoji: "🏠", text: "Cozy and familiar", value: "grounded" }
    ]
  }
];

export default function QuizScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  
  const x = useSharedValue(0);
  const opacity = useSharedValue(1);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const goBack = () => {
    if (currentQuestionIndex > 0) {
      // Go to previous question
      x.value = width;
      opacity.value = 0;
      
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        // Update selected answers array
        setSelectedAnswers(selectedAnswers.slice(0, -1));
        x.value = 0;
        opacity.value = 1;
      }, 300);
    } else {
      router.back();
    }
  };
  
  const selectOption = (value: string) => {
    const newAnswers = [...selectedAnswers, value];
    setSelectedAnswers(newAnswers);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      // Go to next question with animation
      x.value = -width;
      opacity.value = 0;
      
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        x.value = 0;
        opacity.value = 1;
      }, 300);
    } else {
      // Quiz completed
      router.push('/onboarding/result');
    }
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
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
        <View style={styles.headerContainer}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <ArrowLeft color="white" size={20} />
          </Pressable>
          <View style={styles.progressContainer}>
            <ProgressBar currentStep={3 + currentQuestionIndex} totalSteps={7} />
            <Text style={styles.stepText}>Question {currentQuestionIndex + 1} of {quizQuestions.length}</Text>
          </View>
        </View>
        
        <Animated.View style={[styles.questionContainer, animatedStyle]}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <Pressable
                key={index}
                style={styles.optionButton}
                onPress={() => selectOption(option.value)}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text style={styles.optionText}>{option.text}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
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
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 48,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionEmoji: {
    fontSize: 30,
    marginRight: 16,
  },
  optionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
  },
});