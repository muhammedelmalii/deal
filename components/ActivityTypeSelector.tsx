import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Music, Coffee, PenTool, Book, Umbrella, Film, Dumbbell, Palette } from 'lucide-react-native';

export default function ActivityTypeSelector() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const activityTypes = [
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'cafe', icon: Coffee, label: 'Cafes' },
    { id: 'art', icon: PenTool, label: 'Art' },
    { id: 'reading', icon: Book, label: 'Reading' },
    { id: 'outdoor', icon: Umbrella, label: 'Outdoor' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'fitness', icon: Dumbbell, label: 'Fitness' },
    { id: 'creative', icon: Palette, label: 'Creative' },
  ];
  
  return (
    <View style={styles.container}>
      {activityTypes.map((type) => {
        const IconComponent = type.icon;
        const isSelected = selectedType === type.id;
        
        return (
          <Pressable
            key={type.id}
            style={[
              styles.typeButton,
              isSelected && styles.selectedTypeButton
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <IconComponent 
              color={isSelected ? 'white' : 'rgba(255, 255, 255, 0.7)'} 
              size={20} 
            />
            <Text 
              style={[
                styles.typeLabel,
                isSelected && styles.selectedTypeLabel
              ]}
            >
              {type.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: '23%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedTypeButton: {
    backgroundColor: 'rgba(108, 60, 233, 0.6)',
  },
  typeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 6,
  },
  selectedTypeLabel: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});