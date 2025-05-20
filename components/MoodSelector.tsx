import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

type MoodSelectorProps = {
  onSelect: (mood: string) => void;
  selectedMood?: string;
};

export function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
  const [selected, setSelected] = useState(selectedMood || '');
  
  useEffect(() => {
    if (selectedMood) {
      setSelected(selectedMood);
    }
  }, [selectedMood]);
  
  const moods = [
    { name: 'Energized', emoji: '⚡' },
    { name: 'Calm', emoji: '😌' },
    { name: 'Adventurous', emoji: '🧗' },
    { name: 'Lonely', emoji: '🥺' },
    { name: 'Creative', emoji: '🎨' },
  ];
  
  const handleSelect = (mood) => {
    setSelected(mood);
    onSelect(mood);
  };
  
  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.name}
          style={[
            styles.moodButton,
            selected === mood.name && styles.selectedMood,
          ]}
          onPress={() => handleSelect(mood.name)}
        >
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text
            style={[
              styles.moodText,
              selected === mood.name && styles.selectedMoodText,
            ]}
          >
            {mood.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  moodButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedMood: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  selectedMoodText: {
    color: '#FFFFFF',
  },
});