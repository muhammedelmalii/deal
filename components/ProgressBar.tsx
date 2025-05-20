import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Calculate the progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${progressPercentage}%` }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 3,
  },
});