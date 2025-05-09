import React, {useCallback, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import CommonButton from '../../components/CommonButton';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchServiceList} from '../../api/service/ServiceListSlice';
import {fetchPackageList} from '../../api/package/PackageListSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import {showToast} from '../../constants/commonUtils';

const {TextField} = Incubator;

export type AppointmentScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AppointmentScreen'
>;

export type AppointmentScreenRouteProps = RouteProp<
  RootStackParams,
  'AppointmentScreen'
>;

interface Props {}

const AppointmentScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AppointmentScreenNavigationProps>();
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {packages, loadingPackages, packageError} = useSelector(
    (state: RootState) => state.PackageList,
  );
  const {services, loadingServices, serviceError} = useSelector(
    (state: RootState) => state.ServiceList,
  );
  const {RequestedServicesOrPackages} = useSelector(
    (state: RootState) => state.AppointRequest,
  );
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const companyId = '';
      const fetchPackagesPromise = dispatch(
        fetchPackageList({
          uri: `GetAllPackages?composite={"CompanyID":"${companyId}"}`,
        }),
      );
      const fetchServicesPromise = dispatch(
        fetchServiceList({
          uri: `GetAllServices?composite={"CompanyID":"${companyId}"}`,
        }),
      );

      Promise.all([fetchPackagesPromise, fetchServicesPromise]).then(() => {
        // Both requests are complete
      });

      return () => {
        // Cleanup if needed
      };
    }, [refreshing]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);

  const toggleSelection = useCallback((id: number, type: string) => {
    const isSelected = RequestedServicesOrPackages.some((item: any) => {
      if (type === 'package') {
        return item.PackageId === id;
      }
      return item.requestedServices.some(
        (service: any) => service.ServiceId === id,
      );
    });

    let updatedSelection;

    if (isSelected) {
      updatedSelection = RequestedServicesOrPackages.filter((item: any) => {
        if (type === 'package') {
          return item.PackageId !== id;
        }
        return !item.requestedServices.some(
          (service: any) => service.ServiceId === id,
        );
      });
    } else {
      updatedSelection = [
        ...RequestedServicesOrPackages,
        {
          PackageId: type === 'package' ? id : 0,
          requestedServices:
            type === 'service' ? [{ ServiceId: id }] : [{ ServiceId: 0 }],
        },
      ];
    }

    dispatch({
      type: 'SET_REQUESTED_SERVICES_OR_PACKAGES',
      payload: updatedSelection,
    });
  }, [RequestedServicesOrPackages, dispatch]);

  const Continue = async () => {
    navigation.navigate(RouteNames.ScheduleAppointment);
  };

  // console.log(packages?.GetAllPackagesResult?.Data, services?.GetAllServicesResult.Data)

  const renderItem = useCallback(({ item, index }) => {
    const isEvenIndex = index % 2 === 0;
    const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';
    let title = '';
    let id = 0;
    let type = '';

    if ('PackageName' in item) {
      title = item.PackageName;
    } else if ('ServiceName' in item) {
      title = item.ServiceName;
    }

    if ('PackageId' in item) {
      id = item.PackageId;
      type = 'package';
    } else if ('ServiceId' in item) {
      id = item.ServiceId;
      type = 'service';
    }
    const imageUrl = item.ImgUrl
      ? `${item.ImgUrl}?t=${new Date().getTime()}`
      : AppImages.NULLIMAGE;
    return (
      <View style={{ alignItems: alignmentStyle, flex: 1 }}>
        <Pressable onPress={() => toggleSelection(id, type)}>
          <ImageBackground
             source={item.ImgUrl ? {uri: imageUrl} : AppImages.NULLIMAGE}
            style={[styles.itemView, { width: itemWidth }]}
            imageStyle={{ borderRadius: 5 }}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            {RequestedServicesOrPackages.some((selectedItem: any) => {
              if (type === 'package') {
                return selectedItem.PackageId === id;
              }
              return selectedItem.requestedServices.some(
                (service: any) => service.ServiceId === id,
              );
            }) && (
                <View style={styles.chip}>
                  <Image source={AppImages.ROUND} />
                </View>
              )}

            <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </Pressable>
      </View>
    );
  }, [RequestedServicesOrPackages, itemWidth, toggleSelection]);

  return (
    <View flex>
      {loadingPackages && loadingServices && <BackgroundLoader />}

      <View flex marginH-20 marginB-80 marginT-20>
        <Text style={styles.heading}>Book An Appointment</Text>

        <Text style={styles.subHeading}>
          Select the service or package that you need an appointment for
        </Text>
        <FlatList
          data={[
            ...(packages?.GetAllPackagesResult?.Data || []), // Add null check for packages
            ...(services?.GetAllServicesResult?.Data || []), // Add null check for services
          ]}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={renderItem}
        />

        <CommonButton
          title="Continue"
          onPress={() => {
            if (RequestedServicesOrPackages.length == 0) {
              showToast('Select any services or packages to continue');
            } else {
              Continue();
            }
          }}
        />
      </View>
    </View>
  );
};
export default AppointmentScreen;
