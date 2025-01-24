import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Fonts from '../assets/fonts';
import {Colors} from '../assets/Colors';

const ReadMoreText = ({text, numberOfLines = 3, style}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Text
        style={style}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        ellipsizeMode="tail">
        {text}
      </Text>
      {text.length > numberOfLines * 40 && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.readMoreText}>
            {isExpanded ? 'Read Less' : '...Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  readMoreText: {
    color: Colors.goshawkGrey,
    fontFamily: Fonts.Medium,
    // marginTop: 1,
  },
});

export default ReadMoreText;
