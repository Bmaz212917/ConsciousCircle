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
import UserAvatar from '../../../components/UserAvatar';
import MenuWithActions from '../../../components/MenuWithActions';
const coaches = [
  {
    name: 'John Doe',
    role: 'Free',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Jane Doe',
    role: 'Premium',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Alice',
    role: 'Premium',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Bob',
    role: 'Free',
    avatar: require('../../../assets/images/profile.png'),
  },
  {
    name: 'Charlie',
    role: 'Free',
    avatar: require('../../../assets/images/profile.png'),
  },
];
const AllUsers = () => {
  const navigation = useNavigation();
  const [visibleMenu, setVisibleMenu] = useState(null);

  const openMenu = index => setVisibleMenu(index);
  const closeMenu = () => setVisibleMenu(null);

  const handleEdit = coach => {
    console.log('Edit', coach.name);
  };

  const handleDelete = coach => {
    console.log('Delete', coach.name);
  };

  const renderCoachItem = ({item, index}) => {
    const {name, role, avatar} = item;

    return (
      <View style={styles.coachCard}>
        {index % 2 === 0 ? (
          <Image source={avatar} style={styles.avatar} />
        ) : (
          <UserAvatar name={name} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        leftIcon={'menu'}
        title={'All Users'}
        onLeftPress={() => navigation.openDrawer()}
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

export default AllUsers;
