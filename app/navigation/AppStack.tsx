import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from './Routes';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import GuestLogin from '../screens/login/GuestLogin';
import BottomTabs from '../screens/Dashboard/BottomTabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuDrawer from '../screens/drawer/MenuDrawer';
import {Image} from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import AppColors from '../constants/AppColors';
import AppStyles from '../constants/AppStyles';
import PurchaseHistoryList from '../screens/purchase/PurchaseHistoryList';
import PurchaseHistoryDetails from '../screens/purchase/PurchaseHistoryDetails';
import ScheduleAppointment from '../screens/appointment/ScheduleAppointment';
import ConfirmAppointment from '../screens/appointment/ConfirmAppointment';
import ConfirmRequest from '../screens/appointment/ConfirmRequest';
import AppointmentListScreen from '../screens/appointment/AppointmentListScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import SignUpPage from '../screens/register/SignupPage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right',
        animationDuration: 1000,
      }}>
      <Stack.Screen name={RouteNames.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={RouteNames.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={RouteNames.RegisterScreen} component={RegisterScreen} />
      <Stack.Screen
        name={RouteNames.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={RouteNames.GuestLogin} component={GuestLogin} />
      <Stack.Screen name={RouteNames.Dashboard} component={DrawerStack} />
      <Stack.Screen name={RouteNames.ScheduleAppointment} component={ScheduleAppointment} />
      <Stack.Screen
        name={RouteNames.ConfirmAppointment}
        component={ConfirmAppointment}
      />
      <Stack.Screen
        name={RouteNames.ConfirmRequest}
        component={ConfirmRequest}
      />
            <Stack.Screen
        name={RouteNames.SignUpPage}
        component={SignUpPage}
      />
    </Stack.Navigator>
  );
};

function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName={RouteNames.BottomTabs}
      drawerContent={props => <MenuDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 16,
        },
        // drawerStyle: {borderTopRightRadius:20},
        drawerType: 'front',
        drawerPosition: 'left',
        swipeEnabled: true,
      }}>
      <Drawer.Screen
        name={RouteNames.BottomTabs}
        component={BottomTabs}
        options={{
          title: 'Task',
          headerShown: false,
          drawerLabel: () => null,
          swipeEnabled: false,
          drawerActiveBackgroundColor: AppColors.white,
        }}
      />

      {/* <Drawer.Screen
        name={RouteNames.MyProfile}
        component={MyProfile}
        options={{
          title: 'My Profile',
          headerShown: false,
          drawerLabelStyle: AppStyles.drawerText,
          drawerIcon: () => (
            <Image source={AppImages.PROFILE} width={20} height={20} />
          ),
        }}
      /> */}

      <Drawer.Screen
        name={RouteNames.AppointmentListScreen}
        component={AppointmentListScreen}
        options={{
          title: 'My Bookings',
          headerShown: false,
          drawerLabelStyle: AppStyles.drawerText,
          drawerIcon: () => (
            <Image source={AppImages.HISTORY} width={20} height={20} />
          ),
        }}
      />

<Drawer.Screen
        name={RouteNames.Purchase}
        component={Purchase}
        options={{
          title: 'Package History',
          headerShown: false,
          drawerLabelStyle: AppStyles.drawerText,
          drawerIcon: () => (
            <Image source={AppImages.HISTORY} width={20} height={20} />
          ),
        }}
      />

      {/* <Drawer.Screen
        name={RouteNames.PrescriptionDetails}
        component={PrescriptionDetails}
        options={{
          title: 'Prescription Details',
          headerShown: false,
          drawerLabelStyle: AppStyles.drawerText,
          drawerIcon: () => (
            <Image source={AppImages.PRESCRIPTION} width={20} height={20} />
          ),
        }}
      />


      <Drawer.Screen
        name={RouteNames.ReferNEarn}
        component={ReferNEarn}
        options={{
          title: 'Refer & Earn',
          headerShown: false,
          drawerLabelStyle: AppStyles.drawerText,
          drawerIcon: () => (
            <Image source={AppImages.EARN} width={20} height={20} />
          ),
        }}
      />

      <Drawer.Screen
        name={RouteNames.OfferScreen}
        component={OfferScreen}
        options={{
          title: 'Offers',
          drawerLabelStyle: AppStyles.drawerText,
          drawerIcon: () => (
            <Image source={AppImages.OFFER} width={20} height={20} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

const Purchase = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right',
        animationDuration: 1000,
      }}>
      <Stack.Screen
        name={RouteNames.PurchaseHistoryList}
        component={PurchaseHistoryList}
      />
      <Stack.Screen
        name={RouteNames.PurchaseHistoryDetails}
        component={PurchaseHistoryDetails}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
