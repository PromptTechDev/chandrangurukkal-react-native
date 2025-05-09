import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
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
import { getSplitDate } from '../../constants/commonUtils';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

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

      <View flex paddingH-20>
        <Text style={styles.heading}>Package History</Text>

        {purchases?.GetPurchaseListResult.PurchasedPackages.length == 0 ?
        <View flex center>
          <Text text50>{purchases.GetPurchaseListResult.Message}</Text>
          </View>
          :

        <FlatList
          data={purchases?.GetPurchaseListResult.PurchasedPackages}
          showsVerticalScrollIndicator={false}
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
                  <View padding-15 left>
                    <View style={[styles.smallView]}>
                      <Text style={styles.statusText}>{item.Status}</Text>
                    </View>
                  </View>

                  <View padding-15>
                    <Text style={styles.title}>{item.PackageName}</Text>

                    <View row marginT-10 centerV>
                      <Text style={styles.text}>{getSplitDate(item.BillDate)}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
}
      </View>
    </View>
  );
};
export default PurchaseHistoryList;
