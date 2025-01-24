import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Colors} from '../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../../components/CommonButton';
import Fonts from '../../assets/fonts';
import ReadMoreText from '../../components/ReadMoreText';
import SessionTimeIcon from '../../assets/icons/SessionTimeIcon';

const CoachingDetailScreen = props => {
  const navigation = useNavigation();
  const data = props.route.params.data;

  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow-back-outline"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.scrollViewStyle}>
        <Image source={data?.image} style={{height: 280}} />
        <View style={styles.userContainer}>
          <Image source={data?.coach?.image} style={styles.profileImage} />
          <View>
            <Text style={styles.nameText}>{data?.coach?.name}</Text>
            <Text style={styles.catText}>{data?.coach?.category}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>{data?.title}</Text>
          <View style={styles.locationDateContainer}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon
                name="calendar-clear-outline"
                size={18}
                color={Colors.goshawkGrey}
              />
              <Text style={styles.locationText}>
                {data?.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>
            {data?.isBooked ? (
              <View style={styles.locationView}>
                <SessionTimeIcon />
                <Text style={styles.locationText}>{'04:30 PM'}</Text>
              </View>
            ) : (
              <View style={styles.locationView}>
                <Icon
                  name="newspaper-outline"
                  color={Colors.goshawkGrey}
                  size={16}
                />
                <Text style={styles.locationText}>
                  {data?.availableCount + ' Sessions Available'}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.descTitleText}>Description</Text>
            <ReadMoreText
              style={styles.descText}
              text={data?.description}
              numberOfLines={15}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.scheduleButton}>
          <Text style={styles.scheduleText}>Schedule</Text>
          <Icon
            name="calendar-clear-outline"
            size={20}
            color={Colors.goshawkGrey}
          />
        </TouchableOpacity>
      </ScrollView>
      {data?.isBooked ? (
        <CommonButton
          label="JOIN NOW"
          containerStyle={styles.buttonStyle}
          textStyle={{color: 'white'}}
          onPress={()=>{console.log('dd')}}/>
      ) : (
        <CommonButton
          label="BOOK NOW"
          containerStyle={styles.buttonStyle}
          textStyle={{color: 'white'}}
        />
      )}
    </View>
  );
};

export default CoachingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  scrollViewStyle:{
    marginBottom:10
  },
  detailContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    color: Colors.black,
    fontFamily: Fonts.Medium,
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
    flex: 1,
  },
  locationText: {
    color: Colors.goshawkGrey,
    fontSize: 14,
    marginLeft: 8,
    fontFamily: Fonts.Medium,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 200,
    marginRight: 10,
  },
  nameText: {
    fontSize: 20,
    color: Colors.black,
    fontFamily: Fonts.Medium,
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
    fontFamily: Fonts.Medium,
  },
  descTitleText: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.Medium,
  },
  buttonStyle: {
    backgroundColor: 'black',
    marginHorizontal: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  catText: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    color: Colors.goshawkGrey,
    marginRight: 30,
  },
  scheduleButton: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ardcoat,
  },
  scheduleText: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    color: Colors.goshawkGrey,
  },
});
