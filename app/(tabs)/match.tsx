import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { GradientBackground } from '@/components/GradientBackground';
import { MatchCard } from '@/components/MatchCard';
import { Header } from '@/components/Header';
import { Smile, Heart, ZapOff } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { generateMatches } from '@/utils/matchEngine';
import { Match } from '@/types';

export default function MatchScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Generate matches based on user's color
    if (user?.color) {
      const generatedMatches = generateMatches(user.color);
      setMatches(generatedMatches);
    }
  }, [user?.color]);
  
  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    if (filter === 'similar') return match.compatibilityType === 'similar';
    if (filter === 'complementary') return match.compatibilityType === 'complementary';
    return true;
  });
  
  const handleSendVibe = (id: string) => {
    // Simulate sending a vibe emoji
    setMatches(current => 
      current.map(match => 
        match.id === id 
          ? { ...match, vibeSent: true } 
          : match
      )
    );
  };
  
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Header title="Match Suggestions" />
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]} 
            onPress={() => setFilter('all')}
          >
            <Heart size={16} color={filter === 'all' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'} />
            <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'similar' && styles.activeFilter]} 
            onPress={() => setFilter('similar')}
          >
            <Smile size={16} color={filter === 'similar' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'} />
            <Text style={[styles.filterText, filter === 'similar' && styles.activeFilterText]}>Similar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'complementary' && styles.activeFilter]} 
            onPress={() => setFilter('complementary')}
          >
            <ZapOff size={16} color={filter === 'complementary' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'} />
            <Text style={[styles.filterText, filter === 'complementary' && styles.activeFilterText]}>Complementary</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {user?.color ? (
          <FlatList
            data={filteredMatches}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.matchesList}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInDown.duration(500).delay(300 + index * 100)}>
                <MatchCard 
                  match={item} 
                  onSendVibe={() => handleSendVibe(item.id)} 
                />
              </Animated.View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No matches found for this filter</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Discover your color first to find matches</Text>
            <TouchableOpacity 
              style={styles.discoverButton} 
              onPress={() => router.push('/onboarding')}
            >
              <Text style={styles.discoverButtonText}>Discover My Color</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  activeFilter: {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.5)',
  },
  filterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  matchesList: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  discoverButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  discoverButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});