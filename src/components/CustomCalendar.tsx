import React, {useState} from "react";
import {
    Button, FlatList,
    GestureResponderEvent,
    Modal, Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import {BlurView} from "@react-native-community/blur";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from "../Utils/colors";

interface CustomButtonProps {
    navigation: any;
    titleStyle?: ViewStyle;
    buttonContainerStyle?: ViewStyle;
    onButtonPress?: ((event: GestureResponderEvent) => void) | undefined;
    visible?: boolean;
    onDismiss?: (() => void) | undefined;
    cancelable?: (() => void) | undefined;

}

const CustomCalendar: React.FC<CustomButtonProps> = (
    {
        visible,
        onDismiss,
        cancelable,
        onButtonPress,
    }) => {

    const [selectedStartDate,setSelectedStartDate]= useState();
    const [selectedEndDate,setSelectedEndDate]= useState();

    const data =[
        {
            title:'Custom',
            isSelected:true
        },
        {
            title:'Today',
            isSelected:false
        },
        {
            title:'This Week',
            isSelected:false
        },
        {
            title:'This Month',
            isSelected:false
        },
        {
            title:'This Year',
            isSelected:false
        },
        {
            title:'Life Time',
            isSelected:false
        },
    ]

    const [filter,setFilters]= useState(data);
    const [index,setSelectedIndex]= useState(0);

    const onDateChange= (date:any,type:string)=>{
        console.log('onDate----',date,type);
        if (type==='END_DATE'){
            setSelectedEndDate(date);
        }else {
            setSelectedStartDate(date);
        }

    }

    const customDayHeaderStyles = dayOfWeek => {
        return {
            textStyle: {
                fontWeight: 'bold'
            },
        }
    }


    return (
        <Modal
            transparent
            hardwareAccelerated
            visible={visible}
            onRequestClose={() => cancelable != false && onDismiss ? onDismiss() : null}
            animationType={'fade'}
        >
            <SafeAreaView/>
            <BlurView
                blurType='light'
                style={{flex: 1}}>
                <View style={styles.calendarMainContainer}>
                    <View style={styles.calendarBackground}>
                    <CalendarPicker
                        onDateChange={onDateChange}
                        previousComponent={<View accessible={true}>
                            <Entypo name="chevron-small-left" size={24} color="black" /></View>}
                        nextComponent={<View accessible={true}>
                            <Entypo name="chevron-small-right" size={24} color="black" /></View>}
                        dayLabelsWrapper={{borderColor: 'white'}}
                        dayShape = {'square'}
                        allowBackwardRangeSelect={true}
                        customDayHeaderStyles={customDayHeaderStyles}
                        selectedDayColor={colors.secondary}
                        selectedRangeStartStyle={styles.selectedRangeStartEndViewStyle}
                        selectedRangeStyle={styles.selectedRangeViewStyle}
                        selectedRangeEndStyle={styles.selectedRangeStartEndViewStyle}
                        allowRangeSelection={index===0}
                        //selectedDayColor = '#F3F6FF'
                        selectedDayTextColor="white"
                       // selectedDayTextColor={'#000000'}

                    />

                        <FlatList
                            data={filter}
                            numColumns={3}
                            style={{marginHorizontal:20,marginTop:10}}
                            columnWrapperStyle={{ justifyContent: 'space-between' }} // Use columnWrapperStyle for spacing

                            renderItem={({item,index})=> {

                                const {isSelected}= item
                                return (
                                    <TouchableOpacity style={{
                                        backgroundColor:isSelected?'#222B45':'#8F9BB3',
                                        alignSelf:'center',
                                        width:100,
                                        marginBottom:10,
                                        paddingVertical:15,
                                        borderRadius:10,
                                        marginRight:10
                                    }} key={index.toString()}
                                      onPress={()=>{
                                         const filterssData= [...filter];
                                         const data= filterssData.map((item)=>({...item,isSelected:false}));
                                         data[index].isSelected =true;
                                         setFilters(data);
                                          setSelectedIndex(index);

                                      }}
                                    >
                                        <Text style={{color:'white',textAlign:'center',fontSize:14}}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }}

                        />

                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:20,marginBottom:40,marginTop:20}}>
                            <TouchableOpacity style={{backgroundColor:'#BF0003', alignSelf:'center', width:100,
                                paddingVertical:15,borderRadius:10,marginRight:10}} onPress={onDismiss}>
                               <Text style={{color:'white',textAlign:'center', fontSize:12}}>{'Cancel'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'#0043BF', alignSelf:'center',width:100,
                                paddingVertical:15,borderRadius:10,marginRight:10}}>
                                <Text style={{color:'white',textAlign:'center',fontSize:18}}>{'Ok'}</Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </View>

            </BlurView>
        </Modal>
    )
}

export default CustomCalendar;

const styles = StyleSheet.create({
    calendarMainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0)',
       // paddingTop: 42
    },
    calendarBackground: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        //borderWidth: 1,
        borderColor: '#b9b9b9',
        shadowOffset: { width: 0, height: -2 },
        shadowColor: '#b9b9b9',
        shadowOpacity: 0.8,
        shadowRadius: 4,
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
    },
    textStyle: {
        fontWeight: 'bold'
    },
    buttonContainerStyle: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 15,
        width: '100%',
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedRangeStartEndViewStyle:{
        backgroundColor: colors.secondary,
        height: 30,
        width: 30,
        color:'red',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
    selectedRangeViewStyle:{
        backgroundColor: '#0043BF1A',
        margin:0,
        color:'black'

    }
});
