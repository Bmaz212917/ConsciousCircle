import React  from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, TextStyle} from 'react-native';
import {colors} from "../Utils/colors";

export interface PopupMenuData{
    id:number;
    title:string;
    containerStyle?:StyleProp<ViewStyle>;
    textStyle?:StyleProp<ViewStyle>;
}

interface PopupMenuProps{
    menuVisible: boolean;
    menuContainerStyle?: StyleProp<ViewStyle>
    data: PopupMenuData[];
    onItemPress?:((item:PopupMenuData)=> void);
    onCancel:()=> void;
}
const PopupMenu: React.FC<PopupMenuProps> = ({menuVisible,data,onItemPress, onCancel,menuContainerStyle}) => {

    return (
        <View>
            <Modal
                transparent={true}
                animationType="fade"
                visible={menuVisible}
                onRequestClose={onCancel}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={onCancel}
                >
                    <View style={[styles.menuContainer,menuContainerStyle]}>

                        {data?.map((item:PopupMenuData,index:number)=>{
                            return  (
                                <TouchableOpacity  key={index.toString()} style={[styles.menuItem,item.containerStyle]} onPress={()=>onItemPress?.(item)}>
                                    <Text style={[styles.menuText,item.textStyle]}>{item?.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: 120,
        elevation: 5,
        position: 'absolute',
        top: '10%',
        right: 20,
    },
    menuItem: {
        padding: 10,
    },
    menuText: {
        color: colors.greyDark,
    },
    menuTextCancel: {
        color: colors.greyDark,
    },
});

export default PopupMenu;
