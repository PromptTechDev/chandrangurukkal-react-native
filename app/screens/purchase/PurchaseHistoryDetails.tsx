import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {FlatList, ImageBackground, RefreshControl, TouchableOpacity} from 'react-native';
import CommonButton from '../../components/CommonButton';
import AppColors from '../../constants/AppColors';
import { getSplitDate, showToast } from '../../constants/commonUtils';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { fetchPurchaseDetails } from '../../api/purchase/PurchaseDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';

const {TextField} = Incubator;

export type PurchaseHistoryDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PurchaseHistoryDetails'
>;

export type PurchaseHistoryDetailsRouteProps = RouteProp<
  RootStackParams,
  'PurchaseHistoryDetails'
>;

interface Props {}

const PurchaseHistoryDetails: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<PurchaseHistoryDetailsNavigationProps>();
  const {sid, pid, name, date, status} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {details, loadingDetails} = useSelector(
    (state: RootState) => state.PurchaseDetails,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  useEffect(() => {
    dispatch(
      fetchPurchaseDetails({
        uri: `GetPackageHistory?composite={"SalesId":"${sid}","PackageId":"${pid}"}`,
      }),
    );
  }, [refreshing]);


  const toggleServiceSelection = (serviceId: any) => {
    if (status !== 'Completed') {
    setSelectedServices(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(serviceId)) {
        newSelected.delete(serviceId);
      } else {
        newSelected.add(serviceId);
      }
      return newSelected;
    });
  }
  };

  const Continue = () => {
    if (selectedServices.size === 0) {
      showToast('Select a service to continue')
      return;
    }
    if (details?.GetPackageHistoryResult) {
      const { PackageId, ServicePendingList } = details.GetPackageHistoryResult;

      const requestedServices = ServicePendingList
        .filter(service => selectedServices.has(service.ServiceId))
        .map(service => ({
          ServiceId: service.ServiceId,
        }));

      const payload = [
        {
          PackageId: PackageId,
          requestedServices: requestedServices
        }
      ];

      dispatch({
        type: 'SET_SALES_ID',
        payload: sid})

      dispatch({
        type: 'SET_REQUESTED_SERVICES_OR_PACKAGES',
        payload
      });

      navigation.navigate(RouteNames.ScheduleAppointment);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);

  return (
    <View flex backgroundColor={AppColors.whitish}>
        <Header onPress={() => navigation.goBack()} color={'white'} />
        <View flex paddingH-20 paddingB-20>  
          <Text style={[styles.statusText, {fontSize: 24, color:'black'}]}>
          {name}
          </Text>

          <View row centerV marginV-10 >
          <View style={styles.smallView} marginR-10>
              <Text style={styles.priceText}>{status}</Text>
            </View>
                      <Text style={[styles.statusText, {fontSize: 14, color:'black'}]}>{getSplitDate(date)}</Text>
                    </View>
        
      <Text style={styles.subHeading}>Package Summary</Text>
        <View flex style={styles.detailsView}>
        

          <FlatList
            data={details?.GetPackageHistoryResult.ServicePendingList}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => {
              const isSelected = selectedServices.has(item.ServiceId);
              return (
                <TouchableOpacity onPress={() => toggleServiceSelection(item.ServiceId)}
                disabled={status === 'Completed' || item.Status === 'Completed'}>
                       {isSelected && (
                      <View absT absR>
                        <Image source={AppImages.ROUND} />
                      </View>
                    )}
                    <Text style={styles.subText}>{item.ServiceName}</Text>

                    <View row>
                      <View style={styles.innerView}>
                        <Text style={styles.subText1}>Total Qty</Text>
                        <Text style={styles.number}>{item.TotalQty}</Text>
                      </View>

                      <View marginH-5/>

                      <View style={styles.innerView}>
                        <Text style={styles.subText1}>Consumed Qty</Text>
                        <Text style={styles.number}>{item.ConsumedQty}</Text>
                      </View>

                      <View marginH-5/>

                      <View style={styles.innerView}>
                        <Text style={styles.subText1}>Pending Qty</Text>
                        <Text style={styles.number}>{item.PendingQty}</Text>
                      </View>
                    </View>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => 
            <View row flex center marginB-15 marginT-10>
              <View style={styles.dot} />
              <View style={styles.separator} />
              <View style={styles.dot} />
              </View>}
            
          />
        </View>
        {status != 'Completed' &&
          <CommonButton
            title="Continue"
            onPress={() => {
             Continue()
            }}
          />
}
      </View>
    </View>
  );
};
export default PurchaseHistoryDetails;
