import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Incubator, Button} from 'react-native-ui-lib';
import {Animated, Dimensions, PanResponder, StyleSheet} from 'react-native';
import CommonButton from '../../components/CommonButton';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AppFonts from '../../constants/AppFonts';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
const deviceHeight = Dimensions.get('window').height;

LocaleConfig.locales['custom'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Define your custom week day names here
  };
  
  LocaleConfig.defaultLocale = 'custom';
  

const CalendarSheet = (props: {close: any}) => {
  const close = props.close;
  const dispatch = useDispatch();
  const {RequestedDate} = useSelector(
    (state: RootState) => state.AppointRequest,
  );

  useEffect(() => {
    openModal();
  }, []);

  const modalY = useRef(new Animated.Value(deviceHeight)).current;

  const openModal = () => {
    Animated.timing(modalY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    close();
    Animated.timing(modalY, {
      toValue: 300,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          modalY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(modalY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.modal, {transform: [{translateY: modalY}]}]}
      {...panResponder.panHandlers}>
      <View style={styles.handle} />
      <View marginV-20>
        <Text style={styles.select}>Select a date</Text>

        <Calendar
          theme={{
          arrowColor:AppColors.greyBlack,
          textSectionTitleColor: AppColors.greyBlack,
          todayTextColor: AppColors.green,
          todayBackgroundColor: 'rgba(7,109,57,0.06)',
          dayTextColor: AppColors.greyBlack,
          textDisabledColor: '#A7A7A7',
          monthTextColor: AppColors.greyBlack,
          textDayFontFamily: AppFonts.LATO_MEDIUM,
          textMonthFontFamily: AppFonts.LATO_MEDIUM,
          textDayHeaderFontFamily: AppFonts.LATO_MEDIUM,
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
          }}
          enableSwipeMonths={true}
          onDayPress={day => {
            dispatch({
              type: 'SET_REQUESTED_DATE',
              payload: day.dateString})
          }}
          markedDates={{
            [RequestedDate]: {selected: true, disableTouchEvent: true, selectedColor: AppColors.green, selectedTextColor:AppColors.whitish}
          }}
        />
      </View>
      <CommonButton title="Confirm" onPress={() => close()} />
    </Animated.View>
  );
};

export default CalendarSheet;
