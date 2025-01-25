import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import EventListItem from '../../../components/EventListItem';
import CoachingListItem from '../../../components/CoachingListItem';
import {Colors} from '../../../assets/Colors';
import Fonts from '../../../assets/fonts';
import {DummyCoach, DummyEvent} from '../../../Utils/DummyData';
import {useAuth} from '../../../context/AuthProvider';

const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState(DummyEvent);
  const [sessions, setSessions] = useState(DummyCoach);
  const [fabOpen, setFabOpen] = useState(false);
  const {isAdmin, isCoach} = useAuth();
  const [activeTab, setActiveTab] = useState(isCoach ? 2 : 1);
  const animation = React.useRef(new Animated.Value(0)).current;

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
        title={'Consious Circle'}
        onLeftPress={() => navigation.openDrawer()}
        showLogo
        rightIcon={isCoach && 'add-circle-outline'}
        onRightPress={() =>
          isCoach ? navigation.navigate('CreateSession') : null
        }
      />
      {!isCoach && (
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab(1)}
            style={activeTab == 1 ? styles.activeSection : styles.section}>
            <Text style={styles.heading}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab(2)}
            style={activeTab == 2 ? styles.activeSection : styles.section}>
            <Text style={styles.heading}>Coaching</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={activeTab == '1' ? events : sessions}
        // keyExtractor={item => item?.id}
        style={styles.listStyle}
        renderItem={({item, index}) =>
          activeTab == '1' ? (
            <EventListItem data={item} key={index.toString()} />
          ) : (
            <CoachingListItem data={item} key={index.toString()} />
          )
        }
      />

      <View style={styles.fabContainer}>
        <Animated.View style={[styles.fabButton, fabStyle1]}>
          <TouchableOpacity
            style={styles.fabAction}
            onPress={() => {
              !isAdmin
                ? navigation.navigate('CreateEvent')
                : navigation.navigate('CreateSession');
            }}>
            <Icon name="calendar-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.fabButton, fabStyle2]}>
          <TouchableOpacity
            style={styles.fabAction}
            onPress={() => navigation.navigate('AddCoach')}>
            <Icon name="person-add-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {isAdmin && (
          <TouchableOpacity style={styles.fabMain} onPress={toggleFab}>
            <Icon name={fabOpen ? 'close' : 'add'} size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    marginVertical: 10,
    color: Colors.goshawkGrey,
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
  listStyle: {
    padding: 10,
    paddingHorizontal: 20,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fabMain: {
    backgroundColor: Colors.black,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabButton: {
    position: 'absolute',
    backgroundColor: Colors.black,
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
