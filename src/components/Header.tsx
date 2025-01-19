import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({title, leftIcon, rightIcon, onLeftPress, onRightPress}) => {
  return (
    <View style={styles.container}>
      {/* Left Icon */}
      <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
        {leftIcon && <Icon name={leftIcon} size={24} color="#000" />}
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon */}
      <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
        {rightIcon && <Icon name={rightIcon} size={24} color="#000" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#6200EE',
    paddingHorizontal: 15,
    height: 60,
  },
  iconContainer: {
    padding: 5,
  },
  title: {
    // color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
