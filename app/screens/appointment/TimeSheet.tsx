import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Incubator, Button, GridList} from 'react-native-ui-lib';
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
} from 'react-native';
import CommonButton from '../../components/CommonButton';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {isoTime, isoTimeValue} from '../../constants/commonUtils';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMasterData } from '../../api/master/MasterDataSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
const deviceHeight = Dimensions.get('window').height;

const TimeSheet = (props: {close: any, comp_Id: any}) => {
  const close = props.close;
  const comp_Id = props.comp_Id;
  const [times, setTimes] = useState([]);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {masterData, loadingMasterData, masterDataError} = useSelector(
    (state: RootState) => state.MasterData,
  );
  const {RequestedTime} = useSelector(
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

  useFocusEffect(
    React.useCallback(() => {
      let companyId = comp_Id;
      
      dispatch(fetchMasterData({uri: `SetMasterData?composite={"CompanyID":"${companyId}"}`}));

      return () => {
        
      };
    }, []),
  );


  // Function to generate time slots
  const generateTimeSlots = (startTime: any, endTime: any) => {
    if(startTime && endTime){
    const startHour = parseInt(isoTimeValue(startTime).split(':')[0], 10);
    const endHour = parseInt(isoTimeValue(endTime).split(':')[0], 10);

    if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
      console.error('Invalid start or end time');
      return;
    }

    const timeSlots = [];

    for (let i = startHour; i <= endHour; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      const time12HourFormat = i < 12 ? `${hour}:00 AM` : `${hour === '12' ? hour : hour - 12}:00 PM`;
      timeSlots.push({ id: i, time: time12HourFormat });
    }
    setTimes(timeSlots);
  }
  };

  // Call generateTimeSlots() when component mounts
  useEffect(() => {
    generateTimeSlots(masterData?.SetMasterDataResult.Data.CompanyDetails.AppointmentStartTime, masterData?.SetMasterDataResult.Data.CompanyDetails.AppointmentEndTime);
  }, [masterData]);

  return (
    <Animated.View
      style={[styles.modal, {transform: [{translateY: modalY}], padding: 0}]}
      {...panResponder.panHandlers}>
      <View style={[styles.handle, {marginTop: 20}]} />
      <View>
        <Text style={[styles.select, {margin: 20}]}>Select a time</Text>

        <GridList
          data={times}
          listPadding={20}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() =>
                  dispatch({
                    type: 'SET_REQUESTED_TIME',
                    payload: isoTime(item.time),
                  })
                }>
                <View
                  center
                  paddingV-5
                  style={{
                    borderWidth: 1,
                    borderColor: AppColors.stroke,
                    backgroundColor:
                      RequestedTime === isoTime(item.time)
                        ? AppColors.green
                        : '#F1F1F1',
                  }}>
                  <Text style={[styles.time,{  color:
                        RequestedTime === isoTime(item.time)
                          ? 'white'
                          : 'black',}]}>{item.time}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <View padding-20>
        <CommonButton title="Confirm" onPress={() => close()} />
      </View>
    </Animated.View>
  );
};

export default TimeSheet;
