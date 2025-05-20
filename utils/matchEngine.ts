import { Match } from '@/types';

// Simulate AI-generated matches based on user's color
export function generateMatches(userColor: string): Match[] {
  const colorCompatibility = {
    'Purple': ['Blue', 'Green'],
    'Blue': ['Purple', 'Yellow'],
    'Green': ['Purple', 'Red'],
    'Red': ['Green', 'Yellow'],
    'Yellow': ['Blue', 'Red'],
  };
  
  const compatibleColors = colorCompatibility[userColor] || [];
  const complementaryColor = compatibleColors[0];
  const similarColor = userColor;
  
  // Generate 5-8 random matches
  const count = Math.floor(Math.random() * 4) + 5;
  const matches: Match[] = [];
  
  const names = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah', 
    'Sophia', 'Lucas', 'Isabella', 'Mason', 'Mia', 'Logan',
    'Harper', 'Ethan', 'Amelia', 'Jack', 'Charlotte', 'Leo'
  ];
  
  const vibes = [
    'Creative & Thoughtful', 
    'Adventurous & Bold', 
    'Calm & Reflective',
    'Energetic & Fun', 
    'Artistic & Dreamy',
    'Intellectual & Curious',
    'Warm & Nurturing',
    'Confident & Driven'
  ];
  
  const photos = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  ];
  
  for (let i = 0; i < count; i++) {
    const isSimilar = Math.random() > 0.5;
    const matchColor = isSimilar ? similarColor : complementaryColor;
    
    matches.push({
      id: `match-${i}`,
      name: names[Math.floor(Math.random() * names.length)],
      photoUrl: photos[Math.floor(Math.random() * photos.length)],
      color: matchColor,
      vibe: vibes[Math.floor(Math.random() * vibes.length)],
      compatibilityScore: isSimilar 
        ? Math.floor(Math.random() * 16) + 80 // 80-95% for similar
        : Math.floor(Math.random() * 25) + 65, // 65-90% for complementary
      compatibilityType: isSimilar ? 'similar' : 'complementary',
      distance: `${Math.floor(Math.random() * 8) + 1} km away`,
      vibeSent: false,
    });
  }
  
  // Sort by compatibility score
  return matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}