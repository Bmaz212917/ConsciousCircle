import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  generateColorFromInitials,
  getInitials,
} from '../Utils/GeneralFunction';

interface UserAvatarProps {
  name: string;
  avatarStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  isSingleCharacter?: boolean;
}

const UserAvatar = ({
  name,
  outerCircleStyle,
  textStyle,
  avatarStyle,
  isSingleCharacter,
}: UserAvatarProps) => {
  const initialName = getInitials(name);
  const backgroundColor = 'black'
      //generateColorFromInitials(initialName);

  return (
    <View style={styles.item}>
      <View
        style={[
          styles.avatar,
          avatarStyle,
          outerCircleStyle,
          {backgroundColor},
        ]}>
        <Text style={[styles.initialsTextStyle, textStyle]}>
          {isSingleCharacter ? initialName.charAt(0) : initialName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    justifyContent: 'center',
  },
  initialsTextStyle: {
    color:'white',
    alignSelf: 'center',
    fontSize:20,
  },
});

export default UserAvatar;
