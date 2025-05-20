export type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  color?: string;
  colorDescription?: string;
  mood?: string;
  birthData?: {
    date: string;
    time: string;
    location: string;
  };
  colorHistory?: {
    color: string;
    date: string;
  }[];
};

export type Match = {
  id: string;
  name: string;
  photoUrl: string;
  color: string;
  vibe: string;
  compatibilityScore: number;
  compatibilityType: 'similar' | 'complementary';
  distance: string;
  vibeSent?: boolean;
};

export type ActivityType = 'Sport' | 'Social' | 'Nature' | 'Food' | 'Workshop';

export type Activity = {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  cost: number;
  distance: number;
  moodMatch: number;
};