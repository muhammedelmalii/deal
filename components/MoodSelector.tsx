import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';

interface MoodSelectorProps {
  compact?: boolean;
}

export default function MoodSelector({ compact = false }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods = [
    { id: 'energized', emoji: '⚡', label: 'Energized' },
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'adventurous', emoji: '🚀', label: 'Adventurous' },
    { id: 'lonely', emoji: '😔', label: 'Lonely' },
    { id: 'creative', emoji: '✨', label: 'Creative' },
  ];
  
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {moods.map((mood) => (
        <Pressable
          key={mood.id}
          style={[
            styles.moodButton,
            compact && styles.compactMoodButton,
            selectedMood === mood.id && styles.selectedMood,
          ]}
          onPress={() => setSelectedMood(mood.id)}
        >
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          {!compact && <Text style={styles.moodLabel}>{mood.label}</Text>}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compactContainer: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  moodButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  compactMoodButton: {
    flex: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedMood: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
  },
});