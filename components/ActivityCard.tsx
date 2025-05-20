import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Save, Plus, MapPin } from 'lucide-react-native';
import { ColorTheme } from '@/types/theme';

interface ActivityProps {
  activity: {
    id: string;
    title: string;
    description: string;
    price: number;
    distance: number;
    matchPercentage: number;
    image: string;
  };
  colorTheme: ColorTheme;
}

export default function ActivityCard({ activity, colorTheme }: ActivityProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: activity.image }} style={styles.image} />
      
      <View style={styles.matchBadge}>
        <Text style={styles.matchText}>{activity.matchPercentage}% Match</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.description}>{activity.description}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>{activity.price} TL</Text>
          </View>
          
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Distance</Text>
            <Text style={styles.detailValue}>{activity.distance} km</Text>
          </View>
          
          <Pressable style={[styles.mapButton, { backgroundColor: colorTheme.primary }]}>
            <MapPin color="white" size={16} />
          </Pressable>
        </View>
        
        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionButton, styles.saveButton]}>
            <Save color="white" size={16} />
            <Text style={styles.actionButtonText}>Save</Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.actionButton, 
              styles.addButton, 
              { backgroundColor: colorTheme.primary }
            ]}
          >
            <Plus color="white" size={16} />
            <Text style={styles.actionButtonText}>Add to Plan</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: 180,
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  matchText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: 'white',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  detail: {
    marginRight: 24,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  mapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  saveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    flex: 2,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
});