import { createContext, useContext, useState, ReactNode } from 'react';
import { ColorTheme } from '@/types/theme';

// Define the color themes
const colorThemes: Record<string, ColorTheme> = {
  red: {
    primary: '#e63946',
    secondary: '#ff6b6b',
    gradientStart: '#2b0a0a',
    gradientMiddle: '#4c0a13',
    gradientEnd: '#3d0a10',
    particleColor: 'rgba(255, 107, 107, 0.8)',
  },
  blue: {
    primary: '#4361ee',
    secondary: '#4895ef',
    gradientStart: '#0a0a2b',
    gradientMiddle: '#0a134c',
    gradientEnd: '#0a1a3d',
    particleColor: 'rgba(72, 149, 239, 0.8)',
  },
  yellow: {
    primary: '#ffb703',
    secondary: '#fb8500',
    gradientStart: '#2b1a0a',
    gradientMiddle: '#4c290a',
    gradientEnd: '#3d230a',
    particleColor: 'rgba(251, 133, 0, 0.8)',
  },
  green: {
    primary: '#2a9d8f',
    secondary: '#52b788',
    gradientStart: '#0a2b1a',
    gradientMiddle: '#0a4c29',
    gradientEnd: '#0a3d23',
    particleColor: 'rgba(82, 183, 136, 0.8)',
  },
  purple: {
    primary: '#6c3ce9',
    secondary: '#8c4fe9',
    gradientStart: '#0a0a29',
    gradientMiddle: '#1f0a4c',
    gradientEnd: '#2a0a3d',
    particleColor: 'rgba(140, 79, 233, 0.8)',
  },
};

// Define color names and descriptions
const colorDescriptions: Record<string, string> = {
  red: 'Passionate & Energetic',
  blue: 'Calm & Analytical',
  yellow: 'Joyful & Creative',
  green: 'Balanced & Nurturing',
  purple: 'Deep & Intuitive',
};

// Create the context with default values
interface ColorThemeContextType {
  colorTheme: ColorTheme;
  userColorName: string;
  setColorTheme: (color: string) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  colorTheme: colorThemes.purple,
  userColorName: 'Purple',
  setColorTheme: () => {},
});

// Create the provider component
export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [currentColor, setCurrentColor] = useState('purple');
  
  const setColorTheme = (color: string) => {
    if (colorThemes[color]) {
      setCurrentColor(color);
    }
  };
  
  // Capitalize first letter of color name
  const userColorName = currentColor.charAt(0).toUpperCase() + currentColor.slice(1);
  
  return (
    <ColorThemeContext.Provider 
      value={{ 
        colorTheme: colorThemes[currentColor], 
        userColorName: userColorName,
        setColorTheme 
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

// Create a custom hook for easy access
export function useColorTheme() {
  return useContext(ColorThemeContext);
}