import { Activity, ActivityType } from '@/types';

// Simulate AI-generated activity recommendations
export function generateActivities(
  activityType: ActivityType,
  budget: number,
  distance: number,
  mood: string
): Activity[] {
  const activities: Activity[] = [];
  const count = Math.floor(Math.random() * 3) + 3; // 3-5 activities
  
  const sportActivities = [
    { title: 'Morning Yoga in the Park', cost: 100, description: 'Join a group yoga session in Central Park with breathtaking views.' },
    { title: 'Indoor Rock Climbing', cost: 250, description: 'Challenge yourself with different climbing routes for all skill levels.' },
    { title: 'Tennis Court Rental', cost: 150, description: 'Book a court for an hour and enjoy a friendly match.' },
    { title: 'Group Fitness Class', cost: 200, description: 'High-energy workout with professional trainers and motivating music.' },
    { title: 'Swimming at Olympic Pool', cost: 120, description: 'Take a refreshing swim in the Olympic-sized pool with dedicated lanes.' }
  ];
  
  const socialActivities = [
    { title: 'Board Game Café Visit', cost: 150, description: 'Choose from hundreds of games while enjoying coffee and snacks.' },
    { title: 'Karaoke Night', cost: 300, description: 'Sing your heart out with friends in a private karaoke room.' },
    { title: 'Wine Tasting Event', cost: 400, description: 'Sample different wines paired with cheese and learn from experts.' },
    { title: 'Cooking Class', cost: 450, description: 'Learn to make authentic local dishes with a professional chef.' },
    { title: 'Comedy Club Show', cost: 250, description: 'Laugh the night away with stand-up performances from top comedians.' }
  ];
  
  const natureActivities = [
    { title: 'Botanical Garden Tour', cost: 80, description: 'Explore exotic plants and flowers in a tranquil environment.' },
    { title: 'Sunset Beach Walk', cost: 0, description: 'Enjoy the calming sound of waves and beautiful colors of the sky.' },
    { title: 'Bird Watching Expedition', cost: 120, description: 'Observe local and migratory birds with an experienced guide.' },
    { title: 'Forest Trail Hike', cost: 50, description: 'Follow a moderate trail with scenic viewpoints and fresh air.' },
    { title: 'Stargazing Night', cost: 100, description: 'Learn about constellations and planets from astronomy enthusiasts.' }
  ];
  
  const foodActivities = [
    { title: 'Farm-to-Table Dinner', cost: 350, description: 'Enjoy fresh, locally-sourced ingredients prepared by skilled chefs.' },
    { title: 'Street Food Tour', cost: 200, description: 'Sample various authentic street foods from local vendors.' },
    { title: 'Artisanal Coffee Tasting', cost: 120, description: 'Experience different brewing methods and bean varieties.' },
    { title: 'Chocolate Making Workshop', cost: 280, description: 'Create your own chocolates with premium ingredients.' },
    { title: 'Rooftop Restaurant Experience', cost: 400, description: 'Dine with panoramic city views and innovative cuisine.' }
  ];
  
  const workshopActivities = [
    { title: 'Pottery Class', cost: 250, description: 'Create your own ceramic pieces with guidance from artists.' },
    { title: 'Photography Workshop', cost: 300, description: 'Learn composition and lighting techniques for better photos.' },
    { title: 'Creative Writing Session', cost: 150, description: 'Develop your storytelling skills through guided exercises.' },
    { title: 'DIY Crafts Workshop', cost: 200, description: 'Make handmade gifts and decorations using various materials.' },
    { title: 'Language Exchange Meetup', cost: 50, description: 'Practice a new language with native speakers in a casual setting.' }
  ];
  
  let activityPool;
  switch (activityType) {
    case 'Sport':
      activityPool = sportActivities;
      break;
    case 'Social':
      activityPool = socialActivities;
      break;
    case 'Nature':
      activityPool = natureActivities;
      break;
    case 'Food':
      activityPool = foodActivities;
      break;
    case 'Workshop':
      activityPool = workshopActivities;
      break;
    default:
      activityPool = [...sportActivities, ...socialActivities, ...natureActivities, ...foodActivities, ...workshopActivities];
  }
  
  // Filter by budget
  const budgetFiltered = activityPool.filter(activity => activity.cost <= budget);
  
  if (budgetFiltered.length === 0) {
    return []; // No activities within budget
  }
  
  // Calculate mood match based on activity and mood
  const moodActivityMatch = {
    'Energized': ['Sport', 'Social'],
    'Calm': ['Nature', 'Workshop'],
    'Adventurous': ['Sport', 'Nature'],
    'Lonely': ['Social', 'Workshop'],
    'Creative': ['Workshop', 'Food'],
  };
  
  // Generate activities
  for (let i = 0; i < Math.min(count, budgetFiltered.length); i++) {
    const randomIndex = Math.floor(Math.random() * budgetFiltered.length);
    const activity = budgetFiltered[randomIndex];
    
    // Remove used activity to avoid duplicates
    budgetFiltered.splice(randomIndex, 1);
    
    // Calculate distance (random value up to max distance)
    const activityDistance = parseFloat((Math.random() * distance).toFixed(1));
    
    // Calculate mood match
    let moodMatch = 70; // Base match
    if (moodActivityMatch[mood]?.includes(activityType)) {
      moodMatch += Math.floor(Math.random() * 20) + 10; // 80-99% match
    } else {
      moodMatch += Math.floor(Math.random() * 15); // 70-84% match
    }
    
    activities.push({
      id: `activity-${i}`,
      title: activity.title,
      description: activity.description,
      type: activityType,
      cost: activity.cost,
      distance: activityDistance,
      moodMatch,
    });
  }
  
  // Sort by mood match (highest first)
  return activities.sort((a, b) => b.moodMatch - a.moodMatch);
}