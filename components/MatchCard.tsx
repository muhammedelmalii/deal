import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from './Card';
import { Match } from '@/types';
import { MessageCircle } from 'lucide-react-native';

type MatchCardProps = {
  match: Match;
  onSendVibe: () => void;
};

export function MatchCard({ match, onSendVibe }: MatchCardProps) {
  const colorDots = {
    'Purple': '#9333EA',
    'Blue': '#3B82F6',
    'Green': '#10B981',
    'Red': '#EF4444',
    'Yellow': '#F59E0B',
  };
  
  const colorEmojis = {
    'Purple': '🔮',
    'Blue': '💧',
    'Green': '🌿',
    'Red': '🔥',
    'Yellow': '☀️',
  };
  
  const compatibilityClass = match.compatibilityScore >= 85 
    ? styles.highCompatibility
    : match.compatibilityScore >= 70
      ? styles.mediumCompatibility
      : styles.lowCompatibility;
  
  const compatibilityTextClass = match.compatibilityScore >= 85 
    ? styles.highCompatibilityText
    : match.compatibilityScore >= 70
      ? styles.mediumCompatibilityText
      : styles.lowCompatibilityText;
  
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: match.photoUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{match.name}</Text>
            <View style={styles.colorContainer}>
              <View 
                style={[styles.colorDot, { backgroundColor: colorDots[match.color] }]} 
              />
              <Text style={styles.colorText}>
                {match.color} {colorEmojis[match.color]}
              </Text>
            </View>
            <Text style={styles.vibe}>{match.vibe}</Text>
          </View>
        </View>
        
        <View style={styles.compatibilityContainer}>
          <View style={[styles.compatibilityBadge, compatibilityClass]}>
            <Text style={[styles.compatibilityText, compatibilityTextClass]}>
              {match.compatibilityScore}%
            </Text>
          </View>
          <Text style={styles.compatibilityLabel}>Match</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[
            styles.vibeButton,
            match.vibeSent && styles.vibeSentButton
          ]}
          onPress={onSendVibe}
          disabled={match.vibeSent}
        >
          <MessageCircle size={16} color="#FFFFFF" />
          <Text style={styles.vibeButtonText}>
            {match.vibeSent ? 'Vibe Sent' : 'Send Vibe'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.matchTypeContainer}>
          <Text style={styles.matchTypeLabel}>
            {match.compatibilityType === 'similar' ? 'Similar Energy' : 'Complementary'}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  colorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  vibe: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  compatibilityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  compatibilityBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  highCompatibility: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  mediumCompatibility: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  lowCompatibility: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  compatibilityText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  highCompatibilityText: {
    color: '#10B981',
  },
  mediumCompatibilityText: {
    color: '#F59E0B',
  },
  lowCompatibilityText: {
    color: '#EF4444',
  },
  compatibilityLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  vibeButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vibeSentButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.5)',
  },
  vibeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  matchTypeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  matchTypeLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});