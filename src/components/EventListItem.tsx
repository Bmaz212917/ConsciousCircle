import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../assets/fonts';
import AttendeesList from './AttendeesList';
import MenuWithActions from './MenuWithActions';
import {useAuth} from '../context/AuthProvider';

const EventListItem = ({data}) => {
  const navigation = useNavigation();
  const {isAdmin} = useAuth();

  const onEventPress = () => {
    navigation.navigate('EventDetail', {data: data});
  };

  const handleEdit = () => {
    navigation.navigate('CreateEvent', {event: data});
  };

  const handleDelete = () => {
    console.log('handleDelete');
  };
  return (
    <TouchableOpacity onPress={onEventPress} style={styles.listItem}>
      <Image source={data?.image} style={styles.imageStyle} />
      <View style={styles.detailContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemTitle}>
            {data?.title}
          </Text>
          {isAdmin && (
            <MenuWithActions
              onEdit={() => handleEdit(data)}
              onDelete={() => handleDelete(data)}
            />
          )}
        </View>
        <View style={styles.locationView}>
          <Icon name="location-sharp" size={16} color={Colors.goshawkGrey} />
          <Text numberOfLines={2} style={styles.locationText}>
            {data?.location}
          </Text>
        </View>
        {data?.attendees?.length > 0 && (
          <AttendeesList attendees={data?.attendees} />
        )}
      </View>

      <View style={styles.dateTypeContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.itemDetails}>
            {data?.date.toLocaleDateString('en-US', {
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.itemDetails}>
            {data?.date.toLocaleDateString('en-US', {
              month: 'long',
            })}
          </Text>
        </View>
        <View
          style={[
            styles.typeContainer,
            {
              backgroundColor:
                data?.type == 'FREE'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(253, 186, 9, 0.8)',
            },
          ]}>
          <Text
            style={[
              styles.typeText,
              {
                color: data?.type == 'FREE' ? 'black' : 'white',
              },
            ]}>
            {data?.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventListItem;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: Colors.babyWhale,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    // elevation: 2,
    paddingBottom: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: Fonts.Medium,
    color: 'black',
    flex: 1,
  },
  locationView: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'flex-start',
  },
  locationText: {
    color: Colors.goshawkGrey,
    fontSize: 14,
    fontFamily: Fonts.Medium,
    marginLeft: 5,
    marginTop: -2,
  },
  imageStyle: {
    width: '98%',
    height: 220,
    alignSelf: 'center',
  },
  detailContainer: {
    padding: 10,
  },
  itemDetails: {
    fontSize: 13,
    color: Colors.black,
    paddingHorizontal: 10,
    fontFamily: Fonts.Medium,
  },
  dateTypeContainer: {
    position: 'absolute',
    top: 20,
    left: 30,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    paddingVertical: 5,
  },
  typeContainer: {
    backgroundColor: 'rgba(253, 186, 9, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  typeText: {
    color: 'white',
    fontFamily: Fonts.Medium,
    fontSize: 14,
  },
});
