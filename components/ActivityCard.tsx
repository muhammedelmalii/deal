import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Activity } from '@/types';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MapPin, DollarSign, Percent } from 'lucide-react-native';

type ActivityCardProps = {
  activity: Activity;
  delay?: number;
};

export function ActivityCard({ activity, delay = 0 }: ActivityCardProps) {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(delay)}>
      <Card style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{activity.title}</Text>
          <View 
            style={[
              styles.matchBadge,
              activity.moodMatch >= 85 ? styles.highMatch : 
              activity.moodMatch >= 70 ? styles.mediumMatch : 
              styles.lowMatch
            ]}
          >
            <Percent size={12} color="#FFFFFF" />
            <Text style={styles.matchText}>{activity.moodMatch}</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{activity.description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <DollarSign size={14} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.metaText}>{activity.cost} TL</Text>
          </View>
          
          <View style={styles.metaItem}>
            <MapPin size={14} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.metaText}>{activity.distance} km</Text>
          </View>
          
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{activity.type}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Activity</Text>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 2,
  },
  highMatch: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  mediumMatch: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  lowMatch: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  matchText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoryBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  saveButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});