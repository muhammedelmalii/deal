import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ColorCardProps = {
  color: string;
  description: string;
  onPress?: () => void;
};

export function ColorCard({ color, description, onPress }: ColorCardProps) {
  const colorGradients = {
    'Purple': ['#9333EA', '#6366F1'],
    'Blue': ['#3B82F6', '#2563EB'],
    'Green': ['#10B981', '#059669'],
    'Red': ['#EF4444', '#DC2626'],
    'Yellow': ['#F59E0B', '#FBBF24'],
    'Unknown': ['#6B7280', '#4B5563'],
  };
  
  const gradient = colorGradients[color] || colorGradients.Unknown;
  
  const colorEmojis = {
    'Purple': '🔮',
    'Blue': '💧',
    'Green': '🌿',
    'Red': '🔥',
    'Yellow': '☀️',
    'Unknown': '❓',
  };
  
  const emoji = colorEmojis[color] || colorEmojis.Unknown;
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={gradient}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <Text style={styles.emoji}>{emoji}</Text>
            <View>
              <Text style={styles.color}>{color}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
          {onPress && (
            <View style={styles.discoverBadge}>
              <Text style={styles.discoverText}>
                {color === 'Unknown' ? 'Discover' : 'Update'}
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  color: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  discoverBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  discoverText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
});