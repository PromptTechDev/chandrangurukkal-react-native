import React, {useEffect, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import CommonButton from '../../components/CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { bookAppointment, bookAppointmentReset } from '../../api/appointment/BookAppointmentSlice';
import { formattedTime, getUserDate, showToast } from '../../constants/commonUtils';

const {TextField} = Incubator;

export type ConfirmAppointmentNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ConfirmAppointment'
>;

export type ConfirmAppointmentRouteProps = RouteProp<
  RootStackParams,
  'ConfirmAppointment'
>;

interface Props {}

const ConfirmAppointment: React.FC<Props> = () => {
  const navigation = useNavigation<ConfirmAppointmentNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {bookAppointmentData, loadingBookAppointment, bookAppointmentError} = useSelector(
    (state: RootState) => state.BookAppointment,
  );
  const {
    AppointmentRequestId,RequestedBranch,RequestedDate,RequestedTime, RequestedServicesOrPackages
  } = useSelector((state: RootState) => state.AppointRequest);

  const Book = async () => {
    dispatch(
      bookAppointment({
        uri: `BookAppointment?composite={"AppointmentRequestId":${AppointmentRequestId}}`,
      }),
    )
      .then(() => {
        dispatch(bookAppointmentReset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (bookAppointmentData != null) {
      if (
        !loadingBookAppointment &&
        !bookAppointmentError &&
        !bookAppointmentData.BookAppointmentResult.Error
      ) {
        showToast(bookAppointmentData.BookAppointmentResult.Message);
      } else {
        showToast(bookAppointmentData.BookAppointmentResult.Message);
      }
    }
  }, [bookAppointmentData]);

  return (
    <View flex>
      <HomeHeader
        leftIcon={AppImages.LEFT}
        onPress={() => navigation.goBack()}
      />

      <View flex marginH-20 marginB-20>
        <Text style={styles.heading}>Confirm Appointment?</Text>

        <Text style={styles.subHeading}>
          Please review your selections and confirm your appointment
        </Text>

        <View flex>
        <View style={styles.cardView}>
            <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
              <Image source={AppImages.CARDLOGO} />
            </View>

            <Text style={styles.details}>Appointment Details</Text>
            <View marginT-10>
                <Text style={styles.text}>Date</Text>
                <Text style={styles.text1}>{getUserDate(RequestedDate)}</Text>
            </View>

            <View marginT-10>
                <Text style={styles.text}>Time</Text>
                <Text style={styles.text1}>{formattedTime(RequestedTime)}</Text>
            </View>

            <View marginT-10>
                <Text style={styles.text}>Branch</Text>
                <Text style={styles.text1}>{RequestedBranch.name}</Text>
            </View>

            <View marginT-10>
                <Text style={styles.text}>Services / Packages</Text>
                {RequestedServicesOrPackages.map((item, index)=>( 
                  <View key={index} row marginR-5>
                <Text style={styles.text1}>{item.ProductName},</Text>
                </View>
                ))}
                
            </View>
          </View>
        </View>

        <CommonButton
          title="Book Appointment"
          onPress={Book}
        />
      </View>
    </View>
  );
};
export default ConfirmAppointment;
