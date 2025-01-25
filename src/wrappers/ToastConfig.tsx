import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {colors} from "../Utils/colors";

interface CustomToastProps {
    text1: string;
    text2: string;
    customStyle?:StyleProp<ViewStyle>
}

const CustomToast: React.FC<CustomToastProps> = ({text1, text2,customStyle, toastType, ...rest}) => {
    return (<View style={[styles.containerStyle,customStyle]}{...rest}>
        <Text style={{color: 'red', fontWeight: 'bold'}}>{text1}</Text>
        {text2 ? <Text style={{color: 'red'}}>{text2}</Text> : null}
    </View>)
}

const SuccessToast = ({text1, text2}) => (
    <View style={[styles.containerStyle,styles.successToastStyle]}>
        <Icon name={'checkmark'} color="#fff"  size={30}/>
        {text2 ? <Text style={{color: 'white', fontSize: 14,textAlign:'center'}}>{text2}</Text> : null}
         <Text >{' '}</Text>
    </View>
);

const ErrorToast = ({text1, text2}) => (
    <View style={[styles.containerStyle,styles.errorToastStyle]}>
        <MaterialIcon name={'error'} color="#fff"  size={30}/>
        {text2 ? <Text style={{color: 'white', fontSize: 14,textAlign:'center'}}>{text2}</Text> : null}
        <Text >{' '}</Text>
    </View>
);

const toastConfig = {
    customToast: CustomToast,
    success: SuccessToast, // Use the default SuccessToast
    error: ErrorToast,
};

const styles = StyleSheet.create({
    containerStyle: {
        width: '90%',
        height: 60,
        borderRadius: 8,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginTop:15,
        elevation: 5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    successToastStyle: {
        backgroundColor: '#4CAF50', // Green background for success
    },
    errorToastStyle: {
        backgroundColor: colors.secondary//'#F44336',//colors.secondary, // Red background for error //'#F44336'

    },


})
export default toastConfig

