import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import FloatingParticles from '@/components/FloatingParticles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import SegmentedControl from '@/components/SegmentedControl';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MatchCard from '@/components/MatchCard';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const ROTATION_FACTOR = 15; // Degrees of rotation for swiping
const THRESHOLD = width * 0.3; // Swipe threshold to register a decision

export default function MatchesScreen() {
  const { colorTheme } = useColorTheme();
  const [activeTab, setActiveTab] = useState('nearby');
  
  // Sample matches data
  const matches = [
    {
      id: '1',
      name: 'Artemis',
      age: 28,
      color: 'Blue',
      compatibility: 87,
      traits: ['Creative', 'Intuitive', 'Adventurous'],
      image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      name: 'Orion',
      age: 31,
      color: 'Green',
      compatibility: 92,
      traits: ['Analytical', 'Calm', 'Thoughtful'],
      image: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      name: 'Luna',
      age: 26,
      color: 'Purple',
      compatibility: 95,
      traits: ['Energetic', 'Empathetic', 'Social'],
      image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // For card swiping animation
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      // Calculate rotation based on horizontal movement
      rotate.value = (event.translationX / width) * ROTATION_FACTOR;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > THRESHOLD) {
        // Swipe registered
        translateX.value = withSpring(event.translationX > 0 ? width * 1.5 : -width * 1.5);
        // Here you would handle the match decision (like/dislike)
        
        // Reset after animation (in real app, you'd show next profile)
        setTimeout(() => {
          translateX.value = withSpring(0);
          rotate.value = withSpring(0);
        }, 500);
      } else {
        // Return to center if not swiped far enough
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` }
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colorTheme.gradientStart, colorTheme.gradientMiddle, colorTheme.gradientEnd]}
        style={styles.background}
      />
      <FloatingParticles particleColor={colorTheme.particleColor} />
      
      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.screenTitle}>Find Your Matches</Text>
        
        <SegmentedControl
          values={['My Matches', 'Nearby', 'Followers']}
          selectedIndex={activeTab === 'matches' ? 0 : activeTab === 'nearby' ? 1 : 2}
          onChange={(index) => {
            setActiveTab(index === 0 ? 'matches' : index === 1 ? 'nearby' : 'followers');
          }}
        />
        
        <View style={styles.matchContainer}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.cardContainer, cardStyle]}>
              <MatchCard match={matches[0]} colorTheme={colorTheme} />
            </Animated.View>
          </GestureDetector>
          
          {/* Next cards in stack (slightly visible) */}
          <View style={[styles.stackedCard, { zIndex: -1, top: 10 }]}>
            <MatchCard match={matches[1]} colorTheme={colorTheme} />
          </View>
          
          <View style={[styles.stackedCard, { zIndex: -2, top: 20 }]}>
            <MatchCard match={matches[2]} colorTheme={colorTheme} />
          </View>
        </View>
        
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Swipe right to follow, left to pass</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  screenTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 24,
  },
  matchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 20,
  },
  cardContainer: {
    width: '100%',
    height: 500,
    position: 'absolute',
    zIndex: 1,
  },
  stackedCard: {
    width: '100%',
    height: 500,
    position: 'absolute',
    opacity: 0.7,
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});