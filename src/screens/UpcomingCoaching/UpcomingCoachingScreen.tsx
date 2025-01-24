import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

import CoachingListItem from '../../components/CoachingListItem';
import {Colors} from '../../assets/Colors';
import Fonts from '../../assets/fonts';
import {DummyCoach} from '../../Utils/DummyData';

const UpcomingCoachingScreen = () => {
  const navigation = useNavigation();

  const [sessions, setSessions] = useState(DummyCoach?.slice(1));

  return (
    <View style={styles.container}>
      <Header
        leftIcon={'menu'}
        title={'Upcoming Sesisons'}
        onLeftPress={() => navigation.openDrawer()}
      />
      <FlatList
        data={sessions}
        keyExtractor={item => item?.id}
        style={styles.listStyle}
        renderItem={({item, index}) => (
          <CoachingListItem data={item} key={index.toString()} />
        )}
      />
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

export default UpcomingCoachingScreen;
