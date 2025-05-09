import React, {useEffect, useState} from 'react';
import {Button, GridList, Image, Text, View} from 'react-native-ui-lib';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './style';
import AppImages from '../../constants/AppImages';
import { RouteNames } from '../../navigation';
import { RootState } from '../../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchServiceList } from '../../api/service/ServiceListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';

interface Props {
    navigation : any;
    onRefresh: any;
}

const Services = ({navigation, onRefresh}: Props) => {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {services, loadingServices, serviceError} = useSelector(
      (state: RootState) => state.ServiceList,
    );
    const {RequestedServicesOrPackages} = useSelector(
      (state: RootState) => state.AppointRequest,
    );
  
    useFocusEffect(
      React.useCallback(() => {
        let companyId = '';
        dispatch(fetchServiceList({uri: `GetAllServices?composite={"CompanyID":"${companyId}"}`}));
  
        return () => {
          
        };
      }, [onRefresh]),
    );

    const Continue = (serviceId: number) => {
      const isSelected = RequestedServicesOrPackages.some(
        (item: { requestedServices: { ServiceId: number }[] }) =>
          item.requestedServices.some(service => service.ServiceId === serviceId),
      );
  
      // Dispatch action to update the state
      const updatedPackages = isSelected
        ? RequestedServicesOrPackages.map((item: { requestedServices: any[]; }) => ({
            ...item,
            requestedServices: item.requestedServices.filter((service: { ServiceId: number; }) => service.ServiceId !== serviceId),
          })).filter((item: { requestedServices: string | any[]; }) => item.requestedServices.length > 0)
        : [...RequestedServicesOrPackages, { PackageId: 0, requestedServices: [{ ServiceId: serviceId }] }];
  
      dispatch({
        type: 'SET_REQUESTED_SERVICES_OR_PACKAGES',
        payload: updatedPackages,
      });
  
      navigation.navigate(RouteNames.ScheduleAppointment);
    };
    
  return (
    <GridList
    listPadding={20}
    data={services?.GetAllServicesResult.Data}
    numColumns={4}
    renderItem={({item, index}) => {
      const imageUrl = item.ImgUrl ? `${item.ImgUrl}?t=${new Date().getTime()}` : AppImages.NULLIMAGE;
      return (
        // <TouchableOpacity
        //   onPress={() =>
        //    Continue(item.ServiceId)
        //   }>
          <View center>
            <Image  source={item.ImgUrl ? {uri: imageUrl} : AppImages.NULLIMAGE} width={70} height={70} style={{borderRadius:40}}/>
            <Text style={styles.serviceText}>{item.ServiceName}</Text>
          </View>
        // </TouchableOpacity>
      );
    }}
  />
  );
};

export default Services;

