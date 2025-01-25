import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Fonts from '../assets/fonts';
import {Colors} from '../assets/Colors';

interface CommonTextInputProps extends TextInputProps {
  isSvg?: boolean;
  iconSource?: ImageSourcePropType; // Source of the icon image
  iconSize?: number; // Size of the icon (width and height will be the same)
  iconColor?: string; // Color of the icon
}

const CommonTextInput: React.FC<CommonTextInputProps> = ({
  isSvg = false,
  iconSource,
  iconSize = 24,
  iconColor = 'white',
  style,
  ...textInputProps
}) => {
  // Needs to pass image also from previous screen
  return (
    <View style={styles.container}>
      {iconSource && (
        <View style={styles.icon}>
          {isSvg ? (
            iconSource
          ) : (
            <Image
              source={iconSource}
              style={[{width: iconSize, height: iconSize}]}
              tintColor={iconColor}
            />
          )}
        </View>
      )}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={'white'}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ardcoat,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: Fonts.Medium,
  },
});

export default CommonTextInput;
