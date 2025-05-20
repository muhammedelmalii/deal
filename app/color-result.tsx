import { View, Text, StyleSheet, TouchableOpacity, Share, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { useUser } from '@/contexts/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, CalendarClock, Share2 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function ColorResultScreen() {
  const router = useRouter();
  const { user } = useUser();
  
  const colorGradients = {
    'Purple': ['#9333EA', '#6366F1'],
    'Blue': ['#3B82F6', '#2563EB'],
    'Green': ['#10B981', '#059669'],
    'Red': ['#EF4444', '#DC2626'],
    'Yellow': ['#F59E0B', '#FBBF24']
  };
  
  const colorDescriptions = {
    'Purple': "You have a deep intuition and creativity. Your mind constantly explores the unknown, making you a natural at solving complex problems. You connect with others on a spiritual level and often think about the bigger picture.",
    'Blue': "You're calm and thoughtful with a logical approach to life. You value harmony and peace, making you an excellent mediator. Your intellectual curiosity drives you to continuously learn and grow.",
    'Green': "You're practical and reliable with a grounded perspective. You excel at creating structure and systems that work. Your resilience and persistence help you overcome obstacles that others might give up on.",
    'Red': "You're passionate and energetic, approaching life with enthusiasm. You're a natural leader who inspires others with your confidence and determination. You're not afraid to take risks to achieve your goals.",
    'Yellow': "You're cheerful and optimistic, bringing light to every situation. Your social nature helps you connect with others easily. You're adaptable and see possibilities where others see obstacles."
  };
  
  const gradient = colorGradients[user?.color] || ['#6366F1', '#4F46E5'];
  const description = colorDescriptions[user?.color] || "Your unique personality color reveals your authentic self. It's a reflection of your deepest traits, preferences, and potential.";
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `My personality color is ${user?.color}! ${user?.colorDescription}. Find out yours with the Deal app!`
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.header}>
          <Text style={styles.title}>Your Color Result</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.cardContainer}>
          <LinearGradient
            colors={gradient}
            style={styles.colorCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.colorCircle}>
              <Text style={styles.colorEmoji}>
                {user?.color === 'Purple' ? '🔮' : 
                 user?.color === 'Blue' ? '💧' : 
                 user?.color === 'Green' ? '🌿' : 
                 user?.color === 'Red' ? '🔥' : 
                 user?.color === 'Yellow' ? '☀️' : '✨'}
              </Text>
            </View>
            <Text style={styles.colorName}>{user?.color || 'Your Color'}</Text>
            <Text style={styles.colorTagline}>{user?.colorDescription || 'Your Personality'}</Text>
          </LinearGradient>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)} style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(500)} style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Share2 size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Share My Color</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/match')}
          >
            <Users size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Find Matches</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/planner')}
          >
            <CalendarClock size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Plan My Day</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(600)} style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.dashboardButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  colorCard: {
    width: CARD_WIDTH,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  colorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorEmoji: {
    fontSize: 36,
  },
  colorName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  colorTagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  descriptionContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  buttonContainer: {
    width: '100%',
  },
  dashboardButton: {
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
  dashboardButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});