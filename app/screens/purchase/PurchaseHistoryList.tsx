import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {FlatList, ImageBackground, RefreshControl, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchPurchaseList} from '../../api/purchase/PurchaseListSlice';
import {getSplitDate} from '../../constants/commonUtils';
import BackgroundLoader from '../../components/BackgroundLoader';

export type PurchaseHistoryListNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PurchaseHistoryList'
>;

export type PurchaseHistoryListRouteProps = RouteProp<
  RootStackParams,
  'PurchaseHistoryList'
>;

interface Props {}

const PurchaseHistoryList: React.FC<Props> = () => {
  const navigation = useNavigation<PurchaseHistoryListNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {purchases, loadingPurchases, purchaseError} = useSelector(
    (state: RootState) => state.PurchaseList,
  );
  const {PatientId} = useSelector((state: RootState) => state.GlobalVariables);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {

      dispatch(
        fetchPurchaseList({
          uri: `GetPurchaseList?composite={"PatientId":"${PatientId}"}`,
        }),
      );

      return () => {};
    }, [refreshing]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);


  return (
    <View flex>
      <Header onPress={() => navigation.goBack()} color={'black'} />
        {loadingPurchases && <BackgroundLoader/>}

      <View flex style={styles.screenContent}>
        <View style={styles.pageIntro}>
          <Text style={styles.heading}>Package History</Text>
          <Text style={styles.subtitle}>View your purchased treatment packages</Text>
        </View>

        {purchases?.GetPurchaseListResult?.PurchasedPackages?.length === 0 ? (
          <View flex center style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>✓</Text>
            </View>
            <Text style={styles.emptyTitle}>No packages yet</Text>
            <Text style={styles.emptyMessage}>
              {purchases.GetPurchaseListResult.Message || 'Your purchased packages will appear here.'}
            </Text>
          </View>
        ) : (
        <FlatList
          data={purchases?.GetPurchaseListResult.PurchasedPackages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) => `${item.SalesId}-${index}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames.PurchaseHistoryDetails,{sid: item.SalesId, pid: item.PackageId, name: item.PackageName, date: item.BillDate, status: item.Status})
                }>
                <View style={styles.cardView}>
                  <View style={styles.cardAccent} />
                  <View style={styles.cardContent}>
                    <View style={styles.cardTopRow}>
                      <Text style={styles.cardEyebrow}>TREATMENT PACKAGE</Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.Status}</Text>
                      </View>
                    </View>
                    <Text style={styles.title} numberOfLines={2}>{item.PackageName}</Text>
                    <View style={styles.cardBottomRow}>
                      <Text style={styles.dateLabel}>Purchased</Text>
                      <Text style={styles.text}>{getSplitDate(item.BillDate)}</Text>
                      <Text style={styles.cardArrow}>›</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        )}
      </View>
    </View>
  );
};
export default PurchaseHistoryList;
