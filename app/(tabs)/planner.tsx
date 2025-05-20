import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import FloatingParticles from '@/components/FloatingParticles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import RangeSlider from '@/components/RangeSlider';
import ActivityCard from '@/components/ActivityCard';
import MoodSelector from '@/components/MoodSelector';
import ActivityTypeSelector from '@/components/ActivityTypeSelector';

export default function PlannerScreen() {
  const { colorTheme } = useColorTheme();
  const [budget, setBudget] = useState([0, 2500]);
  const [distance, setDistance] = useState([1, 10]);
  
  // Sample activities data
  const activities = [
    {
      id: '1',
      title: 'Star Gazing at Astronomy Club',
      description: 'Join fellow sky enthusiasts for a night of constellation exploration and cosmic discussions.',
      price: 450,
      distance: 3.2,
      matchPercentage: 92,
      image: 'https://images.pexels.com/photos/1525043/pexels-photo-1525043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      title: 'Cosmic Meditation Retreat',
      description: 'Reconnect with your inner universe through guided meditation and breathwork.',
      price: 850,
      distance: 5.5,
      matchPercentage: 87,
      image: 'https://images.pexels.com/photos/3771096/pexels-photo-3771096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      title: 'Galaxy Paint & Sip',
      description: 'Create your own cosmic masterpiece while enjoying stellar cocktails and conversation.',
      price: 650,
      distance: 2.1,
      matchPercentage: 78,
      image: 'https://images.pexels.com/photos/2064596/pexels-photo-2064596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colorTheme.gradientStart, colorTheme.gradientMiddle, colorTheme.gradientEnd]}
        style={styles.background}
      />
      <FloatingParticles particleColor={colorTheme.particleColor} />
      
      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.screenTitle}>Plan Your Day</Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.filterCard}>
            <Text style={styles.filterTitle}>Find Activities</Text>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Activity Type</Text>
              <ActivityTypeSelector />
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Budget (TL)</Text>
              <RangeSlider 
                min={0} 
                max={5000} 
                values={budget}
                onChange={setBudget}
                colorTheme={colorTheme}
              />
              <Text style={styles.rangeText}>{budget[0]} TL - {budget[1]} TL</Text>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Distance (km)</Text>
              <RangeSlider 
                min={1} 
                max={15} 
                values={distance}
                onChange={setDistance}
                colorTheme={colorTheme}
              />
              <Text style={styles.rangeText}>{distance[0]} km - {distance[1]} km</Text>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Your Mood</Text>
              <MoodSelector compact />
            </View>
            
            <Pressable style={styles.submitButton}>
              <LinearGradient
                colors={[colorTheme.primary, colorTheme.secondary]}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.submitGradient}
              >
                <Text style={styles.submitButtonText}>Suggest Activities</Text>
              </LinearGradient>
            </Pressable>
          </View>
          
          <Text style={styles.resultsTitle}>Suggested for You</Text>
          
          {activities.map((activity) => (
            <ActivityCard 
              key={activity.id}
              activity={activity}
              colorTheme={colorTheme}
            />
          ))}
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
  screenTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 24,
  },
  filterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  rangeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 50,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 50,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
  resultsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: 'white',
    marginBottom: 16,
  },
});