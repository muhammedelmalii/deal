import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import MoodSelector from '@/components/MoodSelector';
import FloatingParticles from '@/components/FloatingParticles';
import DashboardCard from '@/components/DashboardCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Users, Calendar } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const { colorTheme, userColorName } = useColorTheme();
  
  const userName = "Stargazer"; // This would come from user authentication

  const navigateToMatches = () => {
    router.push('/matches');
  };

  const navigateToPlanner = () => {
    router.push('/planner');
  };

  const navigateToQuiz = () => {
    router.push('/onboarding/quiz');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colorTheme.gradientStart, colorTheme.gradientMiddle, colorTheme.gradientEnd]}
        style={styles.background}
      />
      <FloatingParticles particleColor={colorTheme.particleColor} />
      
      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        
        <View style={styles.moodContainer}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          <MoodSelector />
        </View>
        
        <View style={styles.colorInsightContainer}>
          <LinearGradient
            colors={[colorTheme.primary, colorTheme.secondary]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.colorBox}
          >
            <Text style={styles.colorName}>{userColorName}</Text>
            <Text style={styles.colorInsight}>
              Today is perfect for deep connections. Your intuitive energy is at its peak.
            </Text>
          </LinearGradient>
        </View>
        
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButton} onPress={navigateToMatches}>
              <Users color="white" size={24} />
              <Text style={styles.actionButtonText}>Find Matches</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton} onPress={navigateToPlanner}>
              <Calendar color="white" size={24} />
              <Text style={styles.actionButtonText}>Plan My Day</Text>
            </Pressable>
          </View>
          
          <Pressable style={styles.quizButton} onPress={navigateToQuiz}>
            <Text style={styles.quizButtonText}>Take Another Quiz</Text>
          </Pressable>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
          contentContainerStyle={styles.cardsContent}
        >
          <DashboardCard 
            title="Discover Matches" 
            description="3 new people match with your energy today"
            buttonText="View Matches"
            onPress={navigateToMatches}
            colorTheme={colorTheme}
          />
          
          <DashboardCard 
            title="Today's Activities" 
            description="5 activities suggested for your mood"
            buttonText="View Activities"
            onPress={navigateToPlanner}
            colorTheme={colorTheme}
          />
          
          <DashboardCard 
            title="Your Color Story" 
            description="Learn more about your personality"
            buttonText="Explore"
            onPress={() => {}}
            colorTheme={colorTheme}
          />
        </ScrollView>
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
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 24,
  },
  moodContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  colorInsightContainer: {
    marginBottom: 24,
  },
  colorBox: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  colorName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
  },
  colorInsight: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  quizButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  cardsContainer: {
    marginBottom: 16,
  },
  cardsContent: {
    paddingRight: 20,
  },
});