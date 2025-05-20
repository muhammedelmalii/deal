import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { GradientBackground } from '@/components/GradientBackground';
import { Header } from '@/components/Header';
import { ActivityCard } from '@/components/ActivityCard';
import { Slider } from '@/components/Slider';
import { ActivityType, Activity } from '@/types';
import { generateActivities } from '@/utils/plannerEngine';
import { Dumbbell, Users, Leaf, Utensils, Lightbulb } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function PlannerScreen() {
  const { user } = useUser();
  const [activityType, setActivityType] = useState<ActivityType>('Sport');
  const [budget, setBudget] = useState(1500);
  const [distance, setDistance] = useState(5);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const activityTypes: {type: ActivityType, icon: any}[] = [
    { type: 'Sport', icon: Dumbbell },
    { type: 'Social', icon: Users },
    { type: 'Nature', icon: Leaf },
    { type: 'Food', icon: Utensils },
    { type: 'Workshop', icon: Lightbulb },
  ];
  
  const generateRecommendations = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newActivities = generateActivities(
        activityType, 
        budget, 
        distance, 
        user?.mood || 'Energized'
      );
      setActivities(newActivities);
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Header title="Daily Planner" />
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Text style={styles.sectionTitle}>Activity Type</Text>
          <View style={styles.activityTypeContainer}>
            {activityTypes.map(({ type, icon: Icon }) => (
              <TouchableOpacity 
                key={type}
                style={[
                  styles.activityTypeButton,
                  activityType === type && styles.activeActivityType
                ]}
                onPress={() => setActivityType(type)}
              >
                <Icon 
                  size={24} 
                  color={activityType === type ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'} 
                />
                <Text 
                  style={[
                    styles.activityTypeText,
                    activityType === type && styles.activeActivityTypeText
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Budget: {budget} TL</Text>
          <Slider 
            value={budget} 
            onValueChange={setBudget} 
            minimumValue={0} 
            maximumValue={3000} 
            step={100} 
          />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)} style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Distance: {distance} km</Text>
          <Slider 
            value={distance} 
            onValueChange={setDistance} 
            minimumValue={1} 
            maximumValue={10} 
            step={1} 
          />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(500)} style={styles.generateContainer}>
          <TouchableOpacity 
            style={styles.generateButton} 
            onPress={generateRecommendations}
            disabled={isGenerating}
          >
            <Text style={styles.generateButtonText}>
              {isGenerating ? 'Generating...' : 'Generate Activities'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        
        {activities.length > 0 && (
          <Animated.View entering={FadeInDown.duration(500).delay(600)}>
            <Text style={styles.resultsTitle}>Recommended Activities</Text>
            <View style={styles.activitiesContainer}>
              {activities.map((activity, index) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  delay={index * 100} 
                />
              ))}
            </View>
          </Animated.View>
        )}
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 12,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  activityTypeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '18%',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeActivityType: {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    borderColor: 'rgba(99, 102, 241, 0.5)',
  },
  activityTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    textAlign: 'center',
  },
  activeActivityTypeText: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  generateContainer: {
    marginVertical: 20,
  },
  generateButton: {
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
  generateButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  resultsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  activitiesContainer: {
    gap: 16,
  },
});