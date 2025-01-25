import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../assets/fonts';
import {useNavigation} from '@react-navigation/native';
import ReadMoreText from './ReadMoreText';
import SessionTimeIcon from '../assets/icons/SessionTimeIcon';
import MeetingLinkIcon from '../assets/icons/MeetingLinkIcon';
import PopupMenu from './PopupMenu';
import {useAuth} from '../context/AuthProvider';
import MenuWithActions from './MenuWithActions';

const CoachingListItem = ({data}) => {
  const navigation = useNavigation();
  const {userRole, isAdmin, isCoach} = useAuth();

  const handleEdit = coach => {
    navigation.navigate('CreateSession', {event: data});
  };

  const handleDelete = coach => {
    console.log('Delete', coach?.name);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CoachingDetail', {data: data})}
      style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={data?.coach?.image} style={styles.profileImage} />
        <View style={{flex: 1}}>
          <Text style={styles.nameText}>{data?.coach?.name}</Text>
          <Text style={styles.catText}>{data?.coach?.category}</Text>
        </View>
        {(isAdmin || isCoach) && (
          <View style={styles.menuContainer}>
            <MenuWithActions
              onEdit={() => handleEdit()}
              onDelete={() => handleDelete()}
            />
          </View>
        )}
      </View>
      <View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.nameText}>
          {data?.title}
        </Text>
        <ReadMoreText style={styles.descText} text={data?.description} />
        {data?.isBooked && (
          <View style={styles.linkContainer}>
            <MeetingLinkIcon />
            <Text style={styles.dateText}>http//:www.meetinglinkforjoin</Text>
          </View>
        )}
        <View style={styles.dateCountContainer}>
          <View style={styles.dateContainer}>
            <Icon
              name="calendar-clear-outline"
              color={Colors.goshawkGrey}
              size={16}
            />
            <Text style={styles.dateText}>
              {data?.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          {data?.isBooked ? (
            <View style={styles.countContainer}>
              <SessionTimeIcon />
              <Text style={styles.dateText}>{'04:30 PM'}</Text>
            </View>
          ) : (
            <View style={styles.countContainer}>
              <SessionTimeIcon />
              <Text style={styles.dateText}>
                {data?.availableCount + ' Sessions Available'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoachingListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.antiWhite,
    padding: 15,
    paddingVertical: 15,
    marginVertical: 10,
  },
  menuContainer: {
    flex: 0.3,
    marginTop: -40,
    marginRight: -40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 200,
    marginRight: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-start',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    overflow: 'hidden',
  },
  catText: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    color: Colors.goshawkGrey,
  },
  descText: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    color: Colors.goshawkGrey,
    marginVertical: 5,
  },
  nameText: {
    fontFamily: Fonts.Medium,
    fontSize: 18,
  },
  dateText: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    color: Colors.goshawkGrey,
    marginLeft: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
