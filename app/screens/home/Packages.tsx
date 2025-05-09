import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from './style';
import AppImages from '../../constants/AppImages';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useFocusEffect} from '@react-navigation/native';
import {fetchPackageList} from '../../api/package/PackageListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {RouteNames} from '../../navigation';

interface Props {
  navigation: any;
  onRefresh: any;
}

const Packages = ({navigation, onRefresh}: Props) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {packages, loadingPackages, packageError} = useSelector(
    (state: RootState) => state.PackageList,
  );
  const {RequestedServicesOrPackages} = useSelector(
    (state: RootState) => state.AppointRequest,
  );

  useFocusEffect(
    React.useCallback(() => {
      let companyId = '';

      dispatch(
        fetchPackageList({
          uri: `GetAllPackages?composite={"CompanyID":"${companyId}"}`,
        }),
      );

      return () => {};
    }, [onRefresh]),
  );

  const Continue = async (productId: number) => {
    const isSelected = RequestedServicesOrPackages.some(
      (item: {PackageId: number}) => item.PackageId === productId,
    );

    // Dispatch action to update the state
    dispatch({
      type: 'SET_REQUESTED_SERVICES_OR_PACKAGES',
      payload: isSelected
        ? RequestedServicesOrPackages.filter(
            (item: {PackageId: number}) => item.PackageId !== productId,
          )
        : [
            ...RequestedServicesOrPackages,
            {PackageId: productId, requestedServices: [{ServiceId: 0}]},
          ],
    });

    navigation.navigate(RouteNames.ScheduleAppointment);
  };

  return (
    <>
      {packages?.GetAllPackagesResult.Data.map((item, index) => {
        const imageUrl = item.ImgUrl
          ? `${item.ImgUrl}?t=${new Date().getTime()}`
          : AppImages.NULLIMAGE;

        return (
          <View key={index} marginT-10 marginR-10>
            {/* <TouchableOpacity onPress={() => Continue(item.PackageId)}> */}
              <ImageBackground
                source={item.ImgUrl ? {uri: imageUrl} : AppImages.NULLIMAGE}
                style={{width: 330, height: 180}}
                imageStyle={{borderRadius: 10}}>
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                />
                <View flex bottom marginH-20 marginB-20>
                  <Text style={styles.packageText}>{item.PackageName}</Text>
                  {/* <View row marginT-20>
                  <View style={styles.smallView}>
                    <Text style={styles.priceText}>AED 2500</Text>
                  </View>

                  <View marginL-5 style={styles.smallView}>
                    <Text style={styles.priceText}>10 - 15 days</Text>
                  </View>
                </View> */}
                </View>
              </ImageBackground>
            {/* </TouchableOpacity> */}
          </View>
        );
      })}
    </>
  );
};

export default Packages;
