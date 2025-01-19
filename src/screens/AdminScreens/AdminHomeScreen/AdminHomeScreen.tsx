import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';

const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [fabOpen, setFabOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const animation = React.useRef(new Animated.Value(0)).current; // Ensure proper initialization

  // Fetch Events and Sessions from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsSnapshot = await firestore().collection('events').get();
        const sessionsSnapshot = await firestore().collection('sessions').get();

        setEvents(
          eventsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})),
        );
        setSessions(
          sessionsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Toggle FAB animation
  const toggleFab = () => {
    const toValue = fabOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setFabOpen(!fabOpen);
  };

  // FAB button animations
  const fabStyle1 = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70], // Adjust distance to prevent overlap
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1], // Ensure scaling from invisible to visible
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1], // Ensure opacity transitions properly
    }),
  };

  const fabStyle2 = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140], // Adjust distance to stack below
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1], // Ensure scaling from invisible to visible
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1], // Ensure opacity transitions properly
    }),
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={'menu'}
        rightIcon={'search'}
        title={'Consious Circle'}
        onLeftPress={() => navigation.openDrawer()}
      />
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={activeTab == 1 ? styles.activeSection : styles.section}>
          <Text style={styles.heading}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(2)}
          style={activeTab == 2 ? styles.activeSection : styles.section}>
          <Text style={styles.heading}>Sessions</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDetails}>{item.date}</Text>
          </View>
        )}
      />
      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        {/* Create Event Button */}
        <Animated.View style={[styles.fabButton, fabStyle1]}>
          <TouchableOpacity
            style={styles.fabAction}
            onPress={() => navigation.navigate('CreateEvent')}>
            <Icon name="calendar-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Add Coach Button */}
        <Animated.View style={[styles.fabButton, fabStyle2]}>
          <TouchableOpacity
            style={styles.fabAction}
            onPress={() => navigation.navigate('AddCoachScreen')}>
            <Icon name="person-add-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Main FAB */}
        <TouchableOpacity style={styles.fabMain} onPress={toggleFab}>
          <Icon name={fabOpen ? 'close' : 'add'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeSection: {
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
  },
  section: {
    alignItems: 'center',
    flex: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fabMain: {
    backgroundColor: '#6200EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabButton: {
    position: 'absolute',
    backgroundColor: '#6200EE',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabAction: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdminHomeScreen;
