import React, {useCallback, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {styles} from './styles';
import {BackHandler, FlatList, ImageBackground, RefreshControl, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchAppointmentList} from '../../api/appointment/AppointmentListSlice';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type AppointmentListScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AppointmentListScreen'
>;

export type AppointmentListScreenRouteProps = RouteProp<
  RootStackParams,
  'AppointmentListScreen'
>;

interface Props {}

const AppointmentListScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AppointmentListScreenNavigationProps>();
  const {PatientId} = useSelector((state: RootState) => state.GlobalVariables);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {appointments, loadingAppointments, appointmentError} = useSelector(
    (state: RootState) => state.AppointmentList,
  );
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        fetchAppointmentList({
          uri: `GetAllAppointmentRequests?composite={"PatientId":"${PatientId}"}`,
        }),
      );
  
      const onBackPress = () => {
        navigation.replace(RouteNames.Dashboard);
        return true; // Prevent default back behavior
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
      return () => {
        backHandler.remove();
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

  return (
    <View flex>
      <Header onPress={() => navigation.replace(RouteNames.Dashboard)} color={'black'} />
      {loadingAppointments && <BackgroundLoader />}

      <View flex paddingH-20>
        <Text style={styles.heading}>My Bookings</Text>

        <FlatList
          data={appointments?.GetAllAppointmentRequestsResult.Data}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            return (
              <View style={styles.cardView1}>
                {/* <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.chip}>
                  <View style={styles.smallView}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View> */}

                <View padding-15>
                  <Text style={[styles.title, {color: AppColors.green}]}>
                    Request No : {item.AppointmentRequestNo}
                  </Text>

                  <View marginT-10 centerV>
                    <Text style={styles.text}>
                    <Text style={{fontFamily:AppFonts.LATO_MEDIUM}}>Request Date</Text> : {item.RequestedDate}
                    </Text>
                    <Text style={styles.text} marginV-10>
                    <Text style={{fontFamily:AppFonts.LATO_MEDIUM}}>Request Time</Text> : {item.RequestedTime}
                    </Text>
                    <Text style={[styles.text]}>
                    <Text style={{fontFamily:AppFonts.LATO_MEDIUM}}>Request Branch</Text> : {item.RequestedBranchName}
                    </Text>
                  </View>

                  {item.IsConfirmed && (
                    <View>
                      <Text marginV-10 style={styles.text}>
                      <Text style={{fontFamily:AppFonts.LATO_MEDIUM}}>Appointment Date</Text> : {item.AppointmentDate}
                      </Text>
                      <Text style={styles.text}>
                      <Text style={{fontFamily:AppFonts.LATO_MEDIUM}}>Appointment Time</Text> : {item.AppointmentFromTime} -{' '}
                        {item.AppointmentToTime}
                      </Text>
                    </View>
                  )}

                  <Text
                    marginT-10
                    style={[
                      styles.title,
                      {color: AppColors.greyBlack, fontSize: 16},
                    ]}>
                    Status :{' '}
                    {item.IsConfirmed ? 'Booking Confirmed' : 'Booking Pending'}
                  </Text>
                  <Text
                    marginT-10
                    style={[
                      styles.title,
                      {color: AppColors.greyBlack, fontSize: 16},
                    ]}>
                    Appointment Status :{' '}
                    {item.AppointmentStatus}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
export default AppointmentListScreen;
