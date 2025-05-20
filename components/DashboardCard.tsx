import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { ColorTheme } from '@/types/theme';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
  colorTheme: ColorTheme;
}

export default function DashboardCard({ 
  title, 
  description, 
  buttonText, 
  onPress,
  colorTheme 
}: DashboardCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          `${colorTheme.primary}30`, // 30% opacity
          `${colorTheme.secondary}20` // 20% opacity
        ]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
            <ChevronRight color="white" size={16} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
    marginRight: 4,
  },
});