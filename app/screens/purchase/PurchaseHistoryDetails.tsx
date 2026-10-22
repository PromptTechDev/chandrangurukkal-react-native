import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import CommonButton from '../../components/CommonButton';
import AppColors from '../../constants/AppColors';
import { getSplitDate, showToast } from '../../constants/commonUtils';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { fetchPurchaseDetails } from '../../api/purchase/PurchaseDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  const {details} = useSelector(
    (state: RootState) => state.PurchaseDetails,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set());
  const packageHistory =
    details?.GetPackageHistoryResult?.SalesId === sid
      ? details.GetPackageHistoryResult
      : undefined;

  useEffect(() => {
    dispatch(
      fetchPurchaseDetails({
        uri: `GetPackageHistory?composite={"SalesId":"${sid}","PackageId":"${pid}"}`,
      }),
    );
  }, [dispatch, pid, refreshing, sid]);


  const toggleServiceSelection = (serviceId: number) => {
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
        <ScrollView
          style={styles.detailsScreen}
          contentContainerStyle={styles.detailsContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.detailHero}>
            <Text style={styles.detailEyebrow}>PACKAGE DETAILS</Text>
            <Text style={styles.detailTitle}>{name}</Text>
            <View style={styles.detailMetaRow}>
              <View style={styles.detailStatusBadge}>
                <Text style={styles.detailStatusText}>{status}</Text>
              </View>
              <Text style={styles.detailDate}>Purchased {getSplitDate(date)}</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.subHeading}>Your services</Text>
            <Text style={styles.sectionCaption}>Select services to book an appointment</Text>
          </View>
          {(packageHistory?.ServicePendingList ?? []).map(item => {
            const isSelected = selectedServices.has(item.ServiceId);
            const canSelect = status !== 'Completed' && item.Status !== 'Completed' && item.PendingQty > 0;
            return (
              <TouchableOpacity
                key={`${item.ServiceId}-${item.SLNo}`}
                style={[styles.serviceCard, isSelected && styles.serviceCardSelected]}
                onPress={() => toggleServiceSelection(item.ServiceId)}
                disabled={!canSelect}
                activeOpacity={0.8}>
                <View style={styles.serviceHeadingRow}>
                  <Text style={styles.serviceName}>{item.ServiceName}</Text>
                  {isSelected ? (
                    <Image source={AppImages.ROUND} style={styles.selectedMark} />
                  ) : (
                    <View style={[styles.serviceState, item.PendingQty === 0 && styles.completedState]}>
                      <Text style={[styles.serviceStateText, item.PendingQty === 0 && styles.completedStateText]}>
                        {item.PendingQty === 0 ? 'Complete' : `${item.PendingQty} left`}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.quantityRow}>
                  <View style={styles.quantityCell}>
                    <Text style={styles.quantityLabel}>Total</Text>
                    <Text style={styles.quantityValue}>{item.TotalQty}</Text>
                  </View>
                  <View style={styles.quantityCell}>
                    <Text style={styles.quantityLabel}>Used</Text>
                    <Text style={styles.quantityValue}>{item.ConsumedQty}</Text>
                  </View>
                  <View style={styles.quantityCell}>
                    <Text style={styles.quantityLabel}>Remaining</Text>
                    <Text style={styles.quantityValue}>{item.PendingQty}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={styles.historySection}>
            <Text style={styles.subHeading}>Recent activity</Text>
            {(packageHistory?.PackageConsumingHistory ?? []).length > 0 ? (
              packageHistory?.PackageConsumingHistory.map(entry => (
                <View key={`${entry.SLNo}-${entry.ConsumedDate}`} style={styles.activityRow}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityCopy}>
                    <Text style={styles.activityName}>{entry.ServiceName}</Text>
                    <Text style={styles.activityDate}>{getSplitDate(entry.ConsumedDate)}</Text>
                  </View>
                  <Text style={styles.activityQty}>×{entry.Qty}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noActivity}>No services have been used yet.</Text>
            )}
          </View>
        </ScrollView>
        {status != 'Completed' &&
          <CommonButton
            title="Continue"
            onPress={() => {
             Continue()
            }}
          />
}
    </View>
  );
};
export default PurchaseHistoryDetails;
