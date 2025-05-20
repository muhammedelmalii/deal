import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, UserPlus, Calendar } from 'lucide-react-native';
import { ColorTheme } from '@/types/theme';

interface MatchProps {
  match: {
    id: string;
    name: string;
    age: number;
    color: string;
    compatibility: number;
    traits: string[];
    image: string;
  };
  colorTheme: ColorTheme;
}

export default function MatchCard({ match, colorTheme }: MatchProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: match.image }} style={styles.image} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.name}>{match.name}, {match.age}</Text>
              <View style={styles.colorRow}>
                <View 
                  style={[
                    styles.colorDot, 
                    { backgroundColor: colorTheme.primary }
                  ]} 
                />
                <Text style={styles.colorName}>{match.color}</Text>
              </View>
            </View>
            
            <View style={[styles.compatibilityBadge, { backgroundColor: colorTheme.primary }]}>
              <Text style={styles.compatibilityText}>{match.compatibility}% Match</Text>
            </View>
          </View>
          
          <View style={styles.traitsContainer}>
            {match.traits.map((trait, index) => (
              <View key={index} style={styles.traitBadge}>
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButton}>
              <UserPlus color="white" size={20} />
              <Text style={styles.actionText}>Follow</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton}>
              <MessageCircle color="white" size={20} />
              <Text style={styles.actionText}>Message</Text>
            </Pressable>
            
            <Pressable style={[styles.actionButton, styles.suggestButton]}>
              <Calendar color="white" size={20} />
              <Text style={styles.actionText}>Suggest Plan</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1f0a4c',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 4,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  colorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  compatibilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  compatibilityText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: 'white',
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  traitBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  traitText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  suggestButton: {
    backgroundColor: 'rgba(108, 60, 233, 0.6)',
  },
  actionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
});