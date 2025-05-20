import { StyleSheet, Text, View } from 'react-native';
import { ColorTheme } from '@/types/theme';

interface MoodTimelineProps {
  colorTheme: ColorTheme;
}

export default function MoodTimeline({ colorTheme }: MoodTimelineProps) {
  // Sample mood data
  const moodHistory = [
    { date: 'Mon', emoji: '😌', color: '#7D85F3' },
    { date: 'Tue', emoji: '⚡', color: '#D55DEC' },
    { date: 'Wed', emoji: '🚀', color: '#5DAFEC' },
    { date: 'Thu', emoji: '✨', color: '#EC5D8D' },
    { date: 'Fri', emoji: '😌', color: '#7D85F3' },
    { date: 'Sat', emoji: '⚡', color: '#D55DEC' },
    { date: 'Sun', emoji: '✨', color: colorTheme.primary },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        {moodHistory.map((mood, index) => (
          <View key={index} style={styles.moodItem}>
            <View 
              style={[
                styles.moodDot, 
                { backgroundColor: mood.color }
              ]} 
            />
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.dateText}>{mood.date}</Text>
          </View>
        ))}
        
        {/* Line connecting the dots */}
        <View style={styles.timelineLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    height: 100,
  },
  timelineLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 40,
    zIndex: 1,
  },
  moodItem: {
    alignItems: 'center',
    zIndex: 2,
  },
  moodDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  moodEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});