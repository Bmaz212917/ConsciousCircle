import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Fonts from '../assets/fonts';
import {Colors} from '../assets/Colors';

const AttendeesList = ({attendees}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>
        {attendees.slice(0, 3).map((attendee, index) => (
          <Image
            key={index}
            source={{uri: attendee.image}}
            style={[styles.avatar, {marginLeft: index > 0 ? -10 : 0}]}
          />
        ))}
      </View>
      {attendees?.length > 3 && (
        <Text style={styles.text}>+{attendees?.length - 3} Going</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: Colors.goshawkGrey,
  },
});

export default AttendeesList;
