import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { GradientBackground } from '@/components/GradientBackground';
import { Card } from '@/components/Card';
import { LogOut, Camera, Settings, ChevronRight, RefreshCw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { user, logout } = useUser();
  const router = useRouter();
  
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.header}>
          <View style={styles.profileImageContainer}>
            {user?.photoUrl ? (
              <Image 
                source={{ uri: user.photoUrl }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>
                  {user?.name ? user.name[0].toUpperCase() : '?'}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          {user?.color && (
            <View style={styles.colorBadge}>
              <View 
                style={[
                  styles.colorDot, 
                  { backgroundColor: getColorHex(user.color) }
                ]} 
              />
              <Text style={styles.colorText}>{user.color}</Text>
            </View>
          )}
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Text style={styles.sectionTitle}>Birth Chart Data</Text>
          <Card style={styles.chartCard}>
            {user?.birthData ? (
              <>
                <View style={styles.chartItem}>
                  <Text style={styles.chartLabel}>Date of Birth</Text>
                  <Text style={styles.chartValue}>{user.birthData.date}</Text>
                </View>
                <View style={styles.chartItem}>
                  <Text style={styles.chartLabel}>Birth Time</Text>
                  <Text style={styles.chartValue}>{user.birthData.time}</Text>
                </View>
                <View style={styles.chartItem}>
                  <Text style={styles.chartLabel}>Birth Location</Text>
                  <Text style={styles.chartValue}>{user.birthData.location}</Text>
                </View>
              </>
            ) : (
              <TouchableOpacity 
                style={styles.addDataButton}
                onPress={() => router.push('/onboarding/birth')}
              >
                <Text style={styles.addDataText}>Add Birth Details</Text>
              </TouchableOpacity>
            )}
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Text style={styles.sectionTitle}>Color History</Text>
          <Card style={styles.historyCard}>
            {user?.colorHistory?.length > 0 ? (
              user.colorHistory.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyColorContainer}>
                    <View 
                      style={[
                        styles.historyColorDot, 
                        { backgroundColor: getColorHex(item.color) }
                      ]} 
                    />
                    <Text style={styles.historyColorText}>{item.color}</Text>
                  </View>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No color history yet</Text>
            )}
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/onboarding')}
            >
              <RefreshCw size={20} color="#FFFFFF" />
              <Text style={styles.actionText}>Retake Color Quiz</Text>
              <ChevronRight size={20} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Settings size={20} color="#FFFFFF" />
              <Text style={styles.actionText}>Settings</Text>
              <ChevronRight size={20} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => {
                logout();
                router.push('/');
              }}
            >
              <LogOut size={20} color="#FFFFFF" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  );
}

const getColorHex = (color: string): string => {
  const colors = {
    'Purple': '#9333EA',
    'Blue': '#3B82F6',
    'Green': '#10B981',
    'Red': '#EF4444',
    'Yellow': '#F59E0B',
  };
  
  return colors[color] || '#6366F1';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  placeholderText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366F1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  colorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  chartCard: {
    marginBottom: 24,
    padding: 16,
  },
  chartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  chartValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  addDataButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  addDataText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#6366F1',
  },
  historyCard: {
    marginBottom: 24,
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  historyColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyColorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  historyColorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  historyDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    paddingVertical: 12,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginTop: 8,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
});