import React, {useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import ButtonView from '../../components/ButtonView';

const {TextField} = Incubator;

export type GuestLoginNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'GuestLogin'
>;

export type GuestLoginRouteProps = RouteProp<RootStackParams, 'GuestLogin'>;

interface Props {}

const GuestLogin: React.FC<Props> = () => {
  const navigation = useNavigation<GuestLoginNavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={AppImages.LOGO} width={113} height={113} />
      </View>

      <View flex centerH>
        <Text style={styles.title}>Guest Login</Text>

        <ButtonView
          title={'Continue with Google'}
          source={AppImages.GOOGLE}
          onPress={() => {}}
          bottom={20}
        />

<ButtonView
          title={'Continue with Facebook'}
          onPress={() => {}}
          source={AppImages.FACEBOOK}
        />

        <Text style={styles.or}>or</Text>

        <ButtonView
          title={'Customer Login'}
          source={AppImages.USER}
          onPress={() => {navigation.navigate(RouteNames.LoginScreen)}}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.privacyPolicy}>
          By clicking on Continue you agree to Chandran Gurukal’s
        </Text>
        <Text style={styles.privacyPolicy}>
          <Text color={AppColors.green}>terms</Text> and{' '}
          <Text color={AppColors.green}>privacy policy</Text>
        </Text>
      </View>
    </View>
  );
};
export default GuestLogin;
