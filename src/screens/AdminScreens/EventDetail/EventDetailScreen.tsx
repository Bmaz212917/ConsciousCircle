import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../../../components/CommonButton';

const EventDetailScreen = props => {
  const navigation = useNavigation();
  const data = props.route.params.data;

  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow-back-outline"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Image source={data?.image} style={{height: 280}} />
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>{data?.title}</Text>
          <View style={styles.locationDateContainer}>
            <View style={styles.locationView}>
              <Icon name="location" size={20} color={Colors.goshawkGrey} />
              <Text style={styles.locationText}>{data?.location}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="calendar" size={20} color={Colors.goshawkGrey} />
              <Text style={styles.locationText}>
                {data?.date.toLocaleDateString('en-GB', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
          {/*<View style={styles.profileContainer}>
            <Image source={data?.image} style={styles.profileImage} />
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>Tamim Ikram</Text>
              <Text style={styles.desgText}>Lorem ipsum dolor</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="call" size={20} color={'white'} />
            </View>
            <View style={styles.iconContainer}>
              <Icon name="chatbubbles" size={20} color={'white'} />
            </View>
          </View>*/}
          <View style={styles.descContainer}>
            <Text style={styles.descTitleText}>Description</Text>
            <Text style={styles.descText}>{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
      <CommonButton
        label="CONFIRM"
        containerStyle={styles.buttonStyle}
        textStyle={{color: 'white'}}
      />
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  detailContainer: {
    padding: 15,
  },
  titleText: {
    fontSize: 24,
    color: Colors.black,
  },
  locationDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationView: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  locationText: {
    color: Colors.goshawkGrey,
    fontSize: 16,
    marginLeft: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 10,
    borderColor: Colors.desiredDawn,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 130,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 20,
    color: Colors.black,
  },
  desgText: {
    fontSize: 16,
    color: Colors.goshawkGrey,
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: Colors.black,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descContainer: {
    marginTop: 10,
  },
  descText: {
    color: Colors.goshawkGrey,
    fontSize: 14,
    marginTop: 5,
  },
  descTitleText: {
    fontSize: 18,
    color: Colors.black,
  },
  buttonStyle: {
    backgroundColor: 'black',
    marginHorizontal: 15,
  },
});
