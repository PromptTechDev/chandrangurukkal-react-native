import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import HomeScreen from '../home/HomeScreen';
import ScheduleAppointment from '../appointment/ScheduleAppointment';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem('PATIENT_ID');
      const name = await AsyncStorage.getItem('PATIENT_NAME');
      const reg = await AsyncStorage.getItem('PATIENT_REG_NO');
      const email = await AsyncStorage.getItem('USER_EMAIL');

      if (id !== null) dispatch({ type: 'SET_PATIENT_ID', payload: Number(id) });
      if (name !== null) dispatch({ type: 'SET_PATIENT_NAME', payload: name });
      if (reg !== null) dispatch({ type: 'SET_PATIENT_REG_NO', payload: reg });
      if (email !== null) dispatch({ type: 'SET_USER_EMAIL', payload: email });
    };

    fetchData();
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Appointment':
        return <ScheduleAppointment />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {/* Custom Bottom Tabs */}
      {activeTab != 'Appointment' &&
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('Home')}>
          <Image
            source={AppImages.HOME}
            style={[styles.icon, { tintColor: activeTab === 'Home' ? AppColors.green : AppColors.greyBlack }]}
          />
          <Text style={[styles.text, { color: activeTab === 'Home' ? AppColors.green : AppColors.greyBlack }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('Appointment')}>
          <Image
            source={AppImages.APPOINTMENT}
            style={[styles.icon, { tintColor: activeTab === 'Appointment' ? AppColors.green : AppColors.greyBlack }]}
          />
          <Text style={[styles.text, { color: activeTab === 'Appointment' ? AppColors.green : AppColors.greyBlack }]}>
            Appointment
          </Text>
        </TouchableOpacity>
      </View>
}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    backgroundColor: AppColors.white,
    elevation:10
  },
  tabButton: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {
    fontFamily: AppFonts.LATO_REGULAR,
    fontSize: 12,
    textAlign: 'center',
  },
});


// import React, {useEffect, useState} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Image, Text, View} from 'react-native-ui-lib';
// import {RouteProp} from '@react-navigation/native';
// import {
//   NativeStackNavigationProp,
//   createNativeStackNavigator,
// } from '@react-navigation/native-stack';
// import {
//   Modal,
//   PermissionsAndroid,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {RootStackParams, RouteNames} from '../../navigation';
// import HomeScreen from '../home/HomeScreen';
// import AppointmentScreen from '../appointment/AppointmentScreen';
// import CallBackScreen from '../callback/CallBackScreen';
// import AppImages from '../../constants/AppImages';
// import AppColors from '../../constants/AppColors';
// import AppFonts from '../../constants/AppFonts';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppStrings from '../../constants/AppStrings';
// import { useDispatch } from 'react-redux';
// import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
// import { RootState } from '../../../store';
// import ScheduleAppointment from '../appointment/ScheduleAppointment';

// const Tab = createBottomTabNavigator();

// export type BottomTabsNavigationProps = NativeStackNavigationProp<
//   RootStackParams,
//   'BottomTabs'
// >;

// export type BottomTabsRouteProps = RouteProp<RootStackParams, 'BottomTabs'>;

// interface Props {}

// const BottomTabs: React.FC<Props> = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const id = await AsyncStorage.getItem(AppStrings.PATIENT_ID);
//       const name = await AsyncStorage.getItem(AppStrings.PATIENT_NAME);
//       const reg = await AsyncStorage.getItem(AppStrings.PATIENT_REG_NO);
//       const email = await AsyncStorage.getItem(AppStrings.USER_EMAIL);
//       if (id !== null) {
//         dispatch({type: 'SET_PATIENT_ID', payload: Number(id)});
//       }
//       if (name !== null) {
//         dispatch({type: 'SET_PATIENT_NAME', payload: name});
//       }
//       if (reg !== null) {
//         dispatch({type: 'SET_PATIENT_REG_NO', payload: reg});
//       }
//       if (email !== null) {
//         dispatch({type: 'SET_USER_EMAIL', payload: email});
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             position: 'absolute',
//             height: 65,
//             backgroundColor: AppColors.white,
//           },
//         }}>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View center style={{width:'100%'}}>
//                 <Image
//                   source={AppImages.HOME}
//                   resizeMode="contain"
//                   style={{
//                     width: 30,
//                     height: 30,
//                     tintColor: focused ? AppColors.green : AppColors.greyBlack,
//                   }}
//                 />
//                 {/* <Text
//                   style={[
//                     styles.text,
//                     {color: focused ? AppColors.green : AppColors.greyBlack},
//                   ]}>
//                   Home
//                 </Text> */}
//               </View>
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Appointment"
//           component={ScheduleAppointment}
//           options={{
//             tabBarStyle:{display:'none'},
//             tabBarIcon: ({focused}) => (
//               <View center>
//                 <Image
//                   source={AppImages.APPOINTMENT}
//                   resizeMode="contain"
//                   style={{
//                     width: 20,
//                     height: 20,
//                     tintColor: focused ? AppColors.green : AppColors.greyBlack,
//                   }}
//                 />
//                 {/* <Text
//                   style={[
//                     styles.text,
//                     {color: focused ? AppColors.green : AppColors.greyBlack},
//                   ]}>
//                   Appointment
//                 </Text> */}
//               </View>
//             ),
            
//           }}
//         />
//         {/* <Tab.Screen
//           name="Callback"
//           listeners={{
//             tabPress: e => {
//               e.preventDefault();
//               toggleModal();
//             },
//           }}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View center>
//                 <Image
//                   source={AppImages.CALLBACK}
//                   resizeMode="contain"
//                   style={{
//                     width: 20,
//                     height: 20,
//                     tintColor: focused ? AppColors.green : AppColors.greyBlack,
//                   }}
//                 />
//                 <Text
//                   style={[
//                     styles.text,
//                     {color: focused ? AppColors.green : AppColors.greyBlack},
//                   ]}>
//                   Callback
//                 </Text>
//               </View>
//             ),
//           }}>
//           {() => null}
//         </Tab.Screen> */}
//       </Tab.Navigator>

//       {/* Modal for Callback */}

//       {/* <CallBackScreen
//         modalVisible={isModalVisible}
//         setModalVisible={setIsModalVisible}
//       /> */}
//     </>
//   );
// };

// export default BottomTabs;

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: AppFonts.LATO_REGULAR,
//     fontSize: 12,
//     textAlign: 'center',
//   }
// });
