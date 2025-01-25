import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Menu, IconButton} from 'react-native-paper';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../assets/Colors';
import Fonts from '../../../assets/fonts';
import UserAvatar from "../../../components/UserAvatar";
const coaches = [
  {
    name: 'John Doe',
    role: 'Fitness Coach',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Jane Doe',
    role: 'Yoga Instructor',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Alice',
    role: 'Personal Trainer',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Bob',
    role: 'Nutritionist',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Charlie',
    role: 'Mental Health Coach',
    avatar: require('../../../assets/images/profile.png'),
  },
];
const CoachListing = () => {
  const navigation = useNavigation();
  const [visibleMenu, setVisibleMenu] = useState(null);

  const openMenu = index => setVisibleMenu(index);
  const closeMenu = () => setVisibleMenu(null);

  const renderCoachItem = ({item, index}) => {
    const {name, role, avatar} = item;

    return (
      <View style={styles.coachCard}>`
        {index%2===0 ?<Image source={avatar} style={styles.avatar}/> :<UserAvatar name={name}/>}`
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
        <View style={{marginTop: -40, marginRight: -20}}>
          <Menu
            visible={visibleMenu === index}
            onDismiss={closeMenu}
            contentStyle={{
              backgroundColor: 'white',
            }}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => openMenu(index)}
              />
            }>
            <Menu.Item onPress={() => {}} title="Edit" />
            <Menu.Item
              onPress={() => {
                Alert.alert(
                  'Are you sure!',
                  'Do you want to delete this coach?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => closeMenu(),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => closeMenu()},
                  ],
                );
              }}
              title="Delete"
            />
          </Menu>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        leftIcon={'menu'}
        rightIcon={'add'}
        title={'Consious Circle'}
        onLeftPress={() => navigation.openDrawer()}
        onRightPress={() => navigation.navigate('AddCoach')}
      />
      <FlatList
        data={coaches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCoachItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.antiWhite,
    padding: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.Medium,
  },
  role: {
    fontSize: 14,
    color: Colors.goshawkGrey,
    fontFamily: Fonts.Medium,
  },
});

export default CoachListing;
