import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import FloatingParticles from '@/components/FloatingParticles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import SegmentedControl from '@/components/SegmentedControl';
import MoodTimeline from '@/components/MoodTimeline';
import { useRouter } from 'expo-router';
import { LogOut, CreditCard as Edit } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { colorTheme, userColorName } = useColorTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  // Sample user data
  const user = {
    name: 'Stargazer',
    birthDate: 'June 21, 1992',
    birthTime: '03:45 AM',
    birthLocation: 'Istanbul, Turkey',
    profileImage: 'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    traits: ['Creative', 'Intuitive', 'Reflective', 'Analytical', 'Empathetic'],
  };

  const handleLogout = () => {
    router.replace('/');
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colorTheme.gradientStart, colorTheme.gradientMiddle, colorTheme.gradientEnd]}
        style={styles.background}
      />
      <FloatingParticles particleColor={colorTheme.particleColor} />
      
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
          <View style={styles.headerButtons}>
            <Pressable style={styles.iconButton} onPress={handleEditProfile}>
              <Edit color="white" size={20} />
            </Pressable>
            <Pressable style={styles.iconButton} onPress={handleLogout}>
              <LogOut color="white" size={20} />
            </Pressable>
          </View>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
              <LinearGradient
                colors={[colorTheme.primary, colorTheme.secondary]}
                style={styles.colorAura}
              />
            </View>
            
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.colorBadge}>
              <Text style={styles.colorName}>{userColorName}</Text>
            </View>
          </View>
          
          <View style={styles.moodSection}>
            <Text style={styles.sectionTitle}>Mood History</Text>
            <MoodTimeline colorTheme={colorTheme} />
          </View>
          
          <SegmentedControl
            values={['My Plans', 'Shared Places', 'Connections']}
            selectedIndex={activeTab}
            onChange={setActiveTab}
          />
          
          {activeTab === 0 && (
            <View style={styles.tabContent}>
              <Text style={styles.emptyStateText}>No plans saved yet</Text>
            </View>
          )}
          
          {activeTab === 1 && (
            <View style={styles.tabContent}>
              <Text style={styles.emptyStateText}>No shared places yet</Text>
            </View>
          )}
          
          {activeTab === 2 && (
            <View style={styles.tabContent}>
              <Text style={styles.emptyStateText}>No connections yet</Text>
            </View>
          )}
          
          <View style={styles.profileDetails}>
            <Text style={styles.sectionTitle}>Profile Details</Text>
            
            <View style={styles.detailCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Birth Date</Text>
                <Text style={styles.detailValue}>{user.birthDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Birth Time</Text>
                <Text style={styles.detailValue}>{user.birthTime}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Birth Location</Text>
                <Text style={styles.detailValue}>{user.birthLocation}</Text>
              </View>
            </View>
            
            <Text style={styles.traitsTitle}>Your Traits</Text>
            <View style={styles.traitsContainer}>
              {user.traits.map((trait, index) => (
                <View key={index} style={styles.traitBadge}>
                  <Text style={styles.traitText}>{trait}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  screenTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  colorAura: {
    position: 'absolute',
    width: 136,
    height: 136,
    borderRadius: 68,
    top: -8,
    left: -8,
    opacity: 0.5,
    zIndex: -1,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  colorBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  colorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  moodSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  tabContent: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  profileDetails: {
    marginBottom: 32,
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  traitsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    marginBottom: 12,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  traitBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  traitText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
  },
});