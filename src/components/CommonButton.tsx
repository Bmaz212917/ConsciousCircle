import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface CommonButtonProps extends TextProps {
  textStyle?: TextStyle; // Source of the icon image
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  textStyle,
  containerStyle,
  label,
  onPress,
  ...textProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]} {...textProps}>
        {label}
      </Text>
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
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default CommonButton;
