import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../assets/fonts';
import {Colors} from '../assets/Colors';
import DrawerIcon from '../assets/icons/DrawerIcon';

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onSearch,
  onRightPress,
  showLogo = false,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchToggle = () => {
    if (isSearching) {
      // Cancel search
      setIsSearching(false);
      setSearchText(''); // Clear search text
      if (onSearch) onSearch(''); // Return empty string when search is canceled
    } else {
      // Start search
      setIsSearching(true);
    }
  };

  const handleSearchChange = text => {
    setSearchText(text);
    if (onSearch) onSearch(text); // Return the search string to the parent component
  };

  return (
    <View style={styles.container}>
      {/* Full TextInput in Search Mode */}
      {isSearching ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInputFull}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearchChange}
            autoFocus
          />
          <TouchableOpacity
            onPress={handleSearchToggle}
            style={styles.clearButton}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        // Normal Header
        <>
          {/* Left Icon */}
          <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
            {leftIcon == 'menu' ? (
              <DrawerIcon />
            ) : Boolean(leftIcon) ? (
              <Icon name={leftIcon} size={24} color="#000" />
            ) : null}
          </TouchableOpacity>

          {/* Title */}
          {!showLogo ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <Image
              source={require('../assets/icons/logo.png')}
              tintColor={'black'}
              style={styles.logoContainer}
            />
          )}
          {/* Right Icon */}
          <TouchableOpacity
            onPress={rightIcon === 'search' ? handleSearchToggle : onRightPress}
            style={styles.iconContainer}>
            {rightIcon && <Icon name={rightIcon} size={24} color="#000" />}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  iconContainer: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.Medium,
    color: Colors.goshawkGrey,
  },
  searchInputFull: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  logoContainer: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Header;
