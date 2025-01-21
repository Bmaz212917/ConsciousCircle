import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onSearch,
  onRightPress,
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
            {leftIcon && <Icon name={leftIcon} size={24} color="#000" />}
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

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
    paddingHorizontal: 15,
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
    fontWeight: 'bold',
  },
  searchInputFull: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default Header;
