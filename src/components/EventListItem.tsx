import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';

const EventListItem = ({data}) => {
  const navigation = useNavigation();

  const onEventPress = () => {
    navigation.navigate('EventDetail', {data: data});
  };

  return (
    <TouchableOpacity onPress={onEventPress} style={styles.listItem}>
      <Image source={data?.image} style={styles.imageStyle} />
      <View style={styles.detailContainer}>
        <Text style={styles.itemTitle}>{data?.title}</Text>
        <View style={styles.locationView}>
          <Icon name="location" size={18} color="#444444" />
          <Text style={styles.locationText}>{data?.location}</Text>
        </View>
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
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{data?.type}</Text>
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
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationView: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  locationText: {
    color: Colors.goshawkGrey,
    fontSize: 14,
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
    fontSize: 16,
    color: Colors.black,
    paddingHorizontal: 10,
  },
  dateTypeContainer: {
    position: 'absolute',
    top: 20,
    left: 40,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    paddingVertical: 5,
  },
  typeContainer: {
    backgroundColor: 'rgba(253, 186, 9, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  typeText: {
    color: 'white',
  },
});
