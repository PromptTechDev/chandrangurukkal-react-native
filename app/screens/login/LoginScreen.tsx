import React, {useEffect, useRef, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import AppImages from '../../constants/AppImages';
import styles from './styles';
import AppColors from '../../constants/AppColors';
import CommonButton from '../../components/CommonButton';
import ButtonView from '../../components/ButtonView';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {createLogin, reset} from '../../api/login/LoginCreateSlice';
import {showToast} from '../../constants/commonUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'LoginScreen'
>;

export type LoginScreenRouteProps = RouteProp<RootStackParams, 'LoginScreen'>;

interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const [userId, setUserId] = useState('');
  const [InvalidId, setInvalidId] = useState(false);
  const [password, setPassword] = useState('');
  const [invalidPass, setInvalidPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const userIdRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {LoginData, loadingLogin, LoginError} = useSelector(
    (state: RootState) => state.loginCreate,
  );

  function Validate() {
    if (userId == '') {
      setInvalidId(true);
      userIdRef.current?.focus();
      return false;
    }
    if (password == '') {
      setInvalidPass(true);
      passwordRef.current?.focus(); 
      return false;
    }
    return true;
  }

  const LoginUser = async () => {
    if (!Validate()) return;
    dispatch(
      createLogin({
        uri: `CustomerLogin?composite={"UserId":"${userId}","Password":"${password}"}`,
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (LoginData != null) {
      if (
        !loadingLogin &&
        !LoginError &&
        !LoginData.CustomerLoginResult.Error
      ) {
        showToast(LoginData.CustomerLoginResult.Message);
        AsyncStorage.setItem(
          AppStrings.ACCESS_TOKEN,
          LoginData.CustomerLoginResult.Tocken == null
            ? ''
            : LoginData.CustomerLoginResult.Tocken,
        );
        AsyncStorage.setItem(
          AppStrings.PATIENT_ID,
          LoginData.CustomerLoginResult.PatientId == null
            ? ''
            : String(LoginData.CustomerLoginResult.PatientId),
        );

        AsyncStorage.setItem(
          AppStrings.PATIENT_NAME,
          LoginData.CustomerLoginResult.PatientName == null
            ? ''
            : LoginData.CustomerLoginResult.PatientName,
        );
        AsyncStorage.setItem(
          AppStrings.PATIENT_REG_NO,
          LoginData.CustomerLoginResult.PatientRegNo == null
            ? ''
            : LoginData.CustomerLoginResult.PatientRegNo,
        );
        AsyncStorage.setItem(
          AppStrings.USER_EMAIL,
          LoginData.CustomerLoginResult.Email == null
            ? ''
            : LoginData.CustomerLoginResult.Email,
        );
        AsyncStorage.setItem(AppStrings.IS_LOGIN, 'true');
        navigation.reset({
          index: 0,
          routes: [{name: RouteNames.Dashboard}],
        });
      } else {
        showToast(LoginData.CustomerLoginResult.Message);
      }
    }
  }, [LoginData]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
         {loadingLogin && <BackgroundLoader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.logoContainer}>
          <Image source={AppImages.LOGO} width={113} height={113} />
          <Text style={styles.title}>Login</Text>
        </View>

       
        <View flex centerH>
          <TextField
          ref={userIdRef}
            placeholder={'User ID'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-15
            onChangeText={text => {
              setUserId(text);
              setInvalidId(false);
            }}
            trailingAccessory={
              <View>{InvalidId && <Text red10>*Required</Text>}</View>
            }
          />

          <TextField
          ref={passwordRef}
            placeholder={'Password'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-15
            secureTextEntry={!showPass}
            trailingAccessory={
              <View row center>
                <Text marginR-10 red10>
                  {invalidPass ? '*Required' : ''}
                </Text>
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <Image source={AppImages.EYECLOSE} width={23} height={15} />
                  ) : (
                    <Image source={AppImages.EYE} />
                  )}
                </TouchableOpacity>
              </View>
            }
            onChangeText={(text: any) => {
              setPassword(text);
              setInvalidPass(false);
            }}
          />

          <CommonButton title={'Login'} onPress={LoginUser} />

          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() =>
              navigation.navigate(RouteNames.ForgotPasswordScreen)
            }>
            <Text style={styles.fgtPass}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          {/* <ButtonView
          title={'Guest Login'}
          source={AppImages.USER}
          onPress={() => {
            navigation.navigate(RouteNames.GuestLogin);
          }}
        /> */}

          <ButtonView
            title={'Sign Up'}
            source={AppImages.USER}
            onPress={() => {
              navigation.navigate(RouteNames.SignUpPage);
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.privacyPolicy}>
          By clicking on Continue you agree to Chandran Gurukal’s
        </Text>
        <Text style={styles.privacyPolicy}>
          <Text color={AppColors.green}>terms</Text> and{' '}
          <Text color={AppColors.green}>privacy policy</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
