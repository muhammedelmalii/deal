import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/contexts/UserContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

const questions = [
  {
    question: "What would you do on a rainy Friday night?",
    options: [
      { text: "Read a book by the window", value: "blue" },
      { text: "Host a game night with friends", value: "yellow" },
      { text: "Watch a documentary", value: "green" },
      { text: "Work on a creative project", value: "purple" }
    ]
  },
  {
    question: "How do you approach a difficult problem?",
    options: [
      { text: "Analyze all possible solutions", value: "green" },
      { text: "Follow your intuition", value: "purple" },
      { text: "Discuss it with others", value: "yellow" },
      { text: "Research similar problems", value: "blue" }
    ]
  },
  {
    question: "What's your ideal vacation?",
    options: [
      { text: "Beach resort with activities", value: "yellow" },
      { text: "Cultural city tour", value: "blue" },
      { text: "Remote cabin in nature", value: "green" },
      { text: "Spiritual retreat", value: "purple" }
    ]
  },
  {
    question: "How do you react to unexpected changes?",
    options: [
      { text: "Adapt quickly and move forward", value: "yellow" },
      { text: "Analyze why it happened", value: "green" },
      { text: "Feel emotions deeply before acting", value: "purple" },
      { text: "Seek guidance from others", value: "blue" }
    ]
  },
  {
    question: "Which quality do you value most in others?",
    options: [
      { text: "Honesty and directness", value: "red" },
      { text: "Creativity and imagination", value: "purple" },
      { text: "Reliability and consistency", value: "green" },
      { text: "Warmth and enthusiasm", value: "yellow" }
    ]
  }
];

export default function QuizScreen() {
  const router = useRouter();
  const { updateUser } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const translateX = useSharedValue(0);
  const isSwipingRef = useRef(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isSwipingRef.current = true;
    })
    .onUpdate((event) => {
      // Only allow swiping left (negative direction) and only if an option is selected
      if (selectedOption !== null && event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (selectedOption !== null && event.translationX < -SWIPE_THRESHOLD) {
        // Swipe completed, animate off screen
        translateX.value = withSpring(-SCREEN_WIDTH);
        handleNextQuestion();
      } else {
        // Reset position
        translateX.value = withSpring(0);
      }
      isSwipingRef.current = false;
    });
  
  const handleSelectOption = (option) => {
    if (!isSwipingRef.current) {
      setSelectedOption(option);
    }
  };
  
  const handleNextQuestion = () => {
    // Save answer
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    
    // Reset for next question
    setSelectedOption(null);
    translateX.value = 0;
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const results = calculateResults(newAnswers);
      updateUser({
        color: results.color,
        colorDescription: results.description,
        colorHistory: [{ 
          color: results.color, 
          date: new Date().toLocaleDateString() 
        }]
      });
      router.push('/color-result');
    }
  };
  
  const calculateResults = (allAnswers) => {
    // Simple algorithm to determine dominant color
    const colorCounts = allAnswers.reduce((acc, val) => {
      acc[val.value] = (acc[val.value] || 0) + 1;
      return acc;
    }, {});
    
    // Find the color with the highest count
    let dominantColor = Object.keys(colorCounts).reduce((a, b) => 
      colorCounts[a] > colorCounts[b] ? a : b
    );
    
    // Map color to description
    const descriptions = {
      purple: "Deep & Intuitive",
      blue: "Calm & Thoughtful",
      green: "Practical & Reliable",
      yellow: "Cheerful & Optimistic",
      red: "Passionate & Energetic",
    };
    
    return {
      color: dominantColor.charAt(0).toUpperCase() + dominantColor.slice(1),
      description: descriptions[dominantColor],
    };
  };
  
  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        {questions.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressSegment,
              {
                backgroundColor: index <= currentQuestionIndex 
                  ? '#6366F1' 
                  : 'rgba(255, 255, 255, 0.2)',
              }
            ]}
          />
        ))}
      </View>
    );
  };
  
  return (
    <GradientBackground>
      <GestureHandlerRootView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {renderProgressBar()}
        
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.questionContainer, animatedStyle]}>
            <Text style={styles.questionText}>
              {currentQuestion.question}
            </Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOption
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text 
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.selectedOptionText
                    ]}
                  >
                    {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {selectedOption && (
              <View style={styles.swipeHintContainer}>
                <Text style={styles.swipeHintText}>Swipe left to continue</Text>
              </View>
            )}
          </Animated.View>
        </GestureDetector>
        
        <View style={styles.manualNavContainer}>
          <TouchableOpacity 
            style={[
              styles.nextButton,
              !selectedOption && styles.disabledButton
            ]}
            onPress={handleNextQuestion}
            disabled={!selectedOption}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
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
  progressBarContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40,
    gap: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedOption: {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    borderColor: 'rgba(99, 102, 241, 0.5)',
  },
  optionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  swipeHintContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  swipeHintText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  manualNavContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  nextButton: {
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
  disabledButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.5)',
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});