import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native-ui-lib';
import {TouchableOpacity, Switch, Share, Alert, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import AppStyles from '../../constants/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

const MenuDrawer = (props: any) => {
  const navigation = useNavigation();
  const {PatientName, UserEmail} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  const LoggingOut = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AppStrings.IS_LOGIN);
    await AsyncStorage.removeItem(AppStrings.PATIENT_ID);
    navigation.reset({
      index: 0,
      routes: [{name: RouteNames.LoginScreen}],
    });
  };
  return (
    <View flex backgroundColor={AppColors.white} paddingV-20>
      <DrawerContentScrollView {...props}>
        <View row centerV marginH-15 style={{width:'85%'}}>
          <View >
            <Image source={AppImages.PLACEHOLDER} style={{width:60, height:60, borderRadius:30}}/>
          </View>
          <View marginH-5 style={{width:'80%'}}>
            <Text style={AppStyles.buttonlabel1}>{PatientName}</Text>
            <Text
              style={[
                AppStyles.drawerText,
                {color: '#949494', marginLeft: 10},
              ]}>
              {UserEmail}
            </Text>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View bottom marginB-100 marginH-15>
        {/* <View row centerV>
          <Image source={AppImages.SETTING} width={20} height={20} />
          <Text marginL-35 style={AppStyles.drawerText}>
            Settings
          </Text>
        </View> */}

        <TouchableOpacity onPress={LoggingOut}>
          <View row centerV marginT-30>
            <Image source={AppImages.LOGOUT} width={20} height={20} />
            <Text marginL-35 style={AppStyles.drawerText}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuDrawer;
