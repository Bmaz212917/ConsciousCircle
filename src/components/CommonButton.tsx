import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextProps,
  Text,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import Fonts from '../assets/fonts';

interface CommonButtonProps extends TextProps {
  textStyle?: TextStyle; // Source of the icon image
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  isLoading: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  textStyle,
  containerStyle,
  label,
  onPress,
  isLoading,
  ...textProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[styles.container, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.textStyle, textStyle]} {...textProps}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    marginRight: 8,
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    fontFamily: Fonts.Medium,
  },
});

export default CommonButton;
