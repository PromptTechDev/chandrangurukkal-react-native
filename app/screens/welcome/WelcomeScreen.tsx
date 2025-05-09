import React, {useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';

export type WelcomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'WelcomeScreen'
>;

export type WelcomeScreenRouteProps = RouteProp<
  RootStackParams,
  'WelcomeScreen'
>;

interface Props {}

const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();

  setTimeout(async () => {
    if ((await AsyncStorage.getItem(AppStrings.IS_LOGIN)) == null) {
      navigation.replace(RouteNames.LoginScreen);
    } else {
      navigation.replace(RouteNames.Dashboard);
    }
  }, 500);

  return (
    <View flex center backgroundColor={AppColors.primary}>
      <Image source={AppImages.LOGO} width={150} height={150} />
    </View>
  );
};
export default WelcomeScreen;
