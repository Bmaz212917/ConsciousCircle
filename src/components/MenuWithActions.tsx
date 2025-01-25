import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuWithActions = ({onEdit, onDelete, menuStyle, iconSize = 20}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={[styles.menu, menuStyle]}
      anchor={
        <Icon
          name="ellipsis-vertical-outline"
          size={iconSize}
          onPress={openMenu}
        />
      }>
      <Menu.Item
        onPress={() => {
          onEdit?.();
          closeMenu();
        }}
        title="Edit"
      />
      <Menu.Item
        onPress={() => {
          Alert.alert('Are you sure!', 'Do you want to delete this item?', [
            {
              text: 'Cancel',
              onPress: closeMenu,
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                onDelete?.();
                closeMenu();
              },
            },
          ]);
        }}
        title="Delete"
      />
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'white',
    marginTop: 35,
    marginRight: 35,
  },
});

export default MenuWithActions;
