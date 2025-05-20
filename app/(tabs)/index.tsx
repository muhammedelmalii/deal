import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { GradientBackground } from '@/components/GradientBackground';
import { ColorCard } from '@/components/ColorCard';
import { MoodSelector } from '@/components/MoodSelector';
import { Card } from '@/components/Card';
import { ArrowRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Dashboard() {
  const router = useRouter();
  const { user, updateMood } = useUser();
  const [dailyInsight, setDailyInsight] = useState('');
  
  useEffect(() => {
    // Simulate getting a daily insight based on user's color
    if (user?.color) {
      const insights = {
        purple: "Your intuitive nature guides you today. Listen to your inner voice.",
        blue: "Your calm demeanor will help resolve conflicts around you today.",
        green: "Your practical approach will lead to progress on ongoing projects.",
        red: "Your passion and energy will inspire others around you today.",
        yellow: "Your optimism will attract new opportunities. Stay open-minded.",
      };
      
      setDailyInsight(insights[user.color.toLowerCase()] || 
        "Today brings new opportunities for growth and connection.");
    } else {
      setDailyInsight("Discover your color to get personalized daily insights.");
    }
  }, [user?.color]);

  const handleMoodChange = (mood) => {
    updateMood(mood);
  };
  
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Text style={styles.greeting}>
            Hello, {user?.name || 'Friend'}
          </Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.colorCardContainer}>
          <ColorCard 
            color={user?.color || 'Unknown'} 
            description={user?.colorDescription || 'Discover your personality color'} 
            onPress={() => router.push('/onboarding')}
          />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          <MoodSelector onSelect={handleMoodChange} selectedMood={user?.mood} />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Card style={styles.insightCard}>
            <Text style={styles.insightTitle}>Daily Insight</Text>
            <Text style={styles.insightText}>{dailyInsight}</Text>
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(500)}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.push('/match')}
            >
              <Text style={styles.actionText}>Find Matches</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.push('/planner')}
            >
              <Text style={styles.actionText}>Plan My Day</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.push('/onboarding/quiz')}
            >
              <Text style={styles.actionText}>Take Another Quiz</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
    paddingTop: 60,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  colorCardContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  insightCard: {
    marginTop: 8,
    marginBottom: 24,
    padding: 16,
  },
  insightTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});