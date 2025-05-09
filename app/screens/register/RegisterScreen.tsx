import React, {useEffect, useRef, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import CommonButton from '../../components/CommonButton';
import ButtonView from '../../components/ButtonView';
import {ScrollView, TouchableOpacity} from 'react-native';
import styles from '../login/styles';
import {RegisterRequest} from '../../api/register/RegisterRequest';
import {RegisterValidation} from '../../api/register/RegistorValidation';
import {showToast} from '../../constants/commonUtils';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import BackgroundLoader from '../../components/BackgroundLoader';
import {createRegister, reset} from '../../api/register/RegisterCreateSlice';

const {TextField} = Incubator;

export type RegisterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'RegisterScreen'
>;

export type RegisterScreenRouteProps = RouteProp<
  RootStackParams,
  'RegisterScreen'
>;

interface Props {}

const RegisterScreen: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<RegisterScreenNavigationProps>();
  const isRegistered = route.params.isRegistered;
  const [regNo, setRegNo] = useState('');
  const regRef = useRef<any>(null);
  const fullNameRef = useRef<any>(null);
  const [registerInput, setRegister] = useState<RegisterRequest>(
    new RegisterRequest(),
  );
  const [registerValidate, setValidate] = useState<RegisterValidation>(
    new RegisterValidation(),
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {RegisterData, loadingRegister, RegisterError} = useSelector(
    (state: RootState) => state.registerCreate,
  );

  useEffect(() => {
    if (isRegistered) {
      regRef.current?.focus();
    } else {
      fullNameRef.current?.focus();
    }
  }, [isRegistered]);

  function Validate() {
    if (isRegistered && regNo == '') {
      setValidate({
        ...registerValidate,
        InvalidRegNo: true,
        error: '*Required',
      });
      return false;
    }
    if (registerInput.FullName == '') {
      setValidate({
        ...registerValidate,
        InvalidName: true,
        error: '*Required',
      });
      return false;
    }

    if (registerInput.MobileNo == '') {
      setValidate({
        ...registerValidate,
        InvalidPhone: true,
        error: '*Required',
      });
      return false;
    }

    if (registerInput.MobileNo && !/^\d{10}$/.test(registerInput.MobileNo)) {
      showToast('Invalid mobile number. Please enter a 10-digit number.');
      return false;
    }

    if (registerInput.Email == '') {
      setValidate({
        ...registerValidate,
        InvalidEmail: true,
        error: '*Required',
      });
      return false;
    }

    if (
      registerInput.Email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerInput.Email)
    ) {
      showToast('Invalid email address. Please enter a valid email.');
      return false;
    }

    if (registerInput.Location == '') {
      setValidate({
        ...registerValidate,
        InvalidLoc: true,
        error: '*Required',
      });
      return false;
    }

    if (registerInput.UserId == '') {
      setValidate({
        ...registerValidate,
        InvalidUserId: true,
        error: '*Required',
      });
      return false;
    }

    if (
      registerInput.UserId &&
      registerInput.UserId != registerValidate.confirmUser
    ) {
      showToast('Please confirm the user id. Mismatch happened.');
      return false;
    }

    if (registerInput.Password == '') {
      setValidate({
        ...registerValidate,
        InvalidUserId: true,
        error: '*Required',
      });
      return false;
    }

    if (
      registerInput.Password &&
      registerInput.Password != registerValidate.confirmPass
    ) {
      showToast('Please confirm the password. Mismatch happened.');
      return false;
    }

    return true;
  }

  const Register = async () => {
    const input = isRegistered
      ? {...registerInput, RegistrationNo: regNo}
      : registerInput;

    const uri = isRegistered
      ? `SaveSignUpDetailsForExistingCustomer?composite=${JSON.stringify(
          input,
        )}`
      : `SaveSignUpDetails?composite=${JSON.stringify(input)}`;

    dispatch(createRegister({uri}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (RegisterData != null) {
      if (isRegistered) {
        if (
          !loadingRegister &&
          !RegisterError &&
          !RegisterData.SaveSignUpDetailsForExistingCustomerResult?.Error
        ) {
          showToast(
            RegisterData.SaveSignUpDetailsForExistingCustomerResult?.Message,
          );
          navigation.replace(RouteNames.LoginScreen);
        } else {
          showToast(
            RegisterData.SaveSignUpDetailsForExistingCustomerResult?.Message,
          );
        }
      } else {
        if (
          !loadingRegister &&
          !RegisterError &&
          !RegisterData.SaveSignUpDetailsResult?.Error
        ) {
          showToast(RegisterData.SaveSignUpDetailsResult?.Message);
          navigation.replace(RouteNames.LoginScreen);
        } else {
          showToast(RegisterData.SaveSignUpDetailsResult?.Message);
        }
      }
    }
  }, [RegisterData]);

  return (
    <View style={styles.container}>
      {loadingRegister && <BackgroundLoader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View flex centerH>
          <View style={[styles.logoContainer, {marginVertical: 20}]}>
            <Image source={AppImages.LOGO} width={113} height={113} />
            <Text style={styles.title}>Signup</Text>
          </View>

          {isRegistered && (
            <TextField
              ref={regRef}
              placeholder={'Registration No'}
              placeholderTextColor={AppColors.gray}
              fieldStyle={styles.fieldStyle}
              paddingH-15
              marginB-20
              onChangeText={text => {
                setRegNo(text);
                setValidate({...registerValidate, InvalidRegNo: false});
              }}
              trailingAccessory={
                <View>
                  {registerValidate.InvalidRegNo && (
                    <Text red10>*Required</Text>
                  )}
                </View>
              }
            />
          )}

          <TextField
            ref={fullNameRef}
            placeholder={'Full Name'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            onChangeText={text => {
              setRegister({...registerInput, FullName: text});
              setValidate({...registerValidate, InvalidName: false});
            }}
            trailingAccessory={
              <View>
                {registerValidate.InvalidName && <Text red10>*Required</Text>}
              </View>
            }
          />

          <TextField
            placeholder={'Mobile Number'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            keyboardType={'phone-pad'}
            onChangeText={text => {
              setRegister({...registerInput, MobileNo: text});
              setValidate({...registerValidate, InvalidPhone: false});
            }}
            trailingAccessory={
              <View>
                {registerValidate.InvalidPhone && <Text red10>*Required</Text>}
              </View>
            }
          />

          <TextField
            placeholder={'Email'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            onChangeText={text => {
              setRegister({...registerInput, Email: text});
              setValidate({...registerValidate, InvalidEmail: false});
            }}
            trailingAccessory={
              <View>
                {registerValidate.InvalidEmail && <Text red10>*Required</Text>}
              </View>
            }
          />

          <TextField
            placeholder={'Location'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            onChangeText={text => {
              setRegister({...registerInput, Location: text});
              setValidate({...registerValidate, InvalidLoc: false});
            }}
            trailingAccessory={
              <View>
                {registerValidate.InvalidLoc && <Text red10>*Required</Text>}
              </View>
            }
          />

          <TextField
            placeholder={'User ID'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            onChangeText={text => {
              setRegister({...registerInput, UserId: text});
              setValidate({...registerValidate, InvalidUserId: false});
            }}
            trailingAccessory={
              <View>
                {registerValidate.InvalidUserId && <Text red10>*Required</Text>}
              </View>
            }
          />

          <TextField
            placeholder={'Confirm User ID'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            onChangeText={text => {
              setValidate({...registerValidate, confirmUser: text});
            }}
          />

          <TextField
            placeholder={'Password'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            secureTextEntry={!registerValidate.showPassword}
            onChangeText={text => {
              setRegister({...registerInput, Password: text});
              setValidate({...registerValidate, InvalidPassword: false});
            }}
            trailingAccessory={
              <View row center>
                {registerValidate.InvalidPassword && (
                  <Text red10>*Required</Text>
                )}
                <TouchableOpacity
                  onPress={() =>
                    setValidate({
                      ...registerValidate,
                      showPassword: !registerValidate.showPassword,
                    })
                  }>
                  {registerValidate.showPassword ? (
                    <Image source={AppImages.EYECLOSE} width={23} height={15} />
                  ) : (
                    <Image source={AppImages.EYE} />
                  )}
                </TouchableOpacity>
              </View>
            }
          />

          <TextField
            placeholder={'Confirm Password'}
            placeholderTextColor={AppColors.gray}
            fieldStyle={styles.fieldStyle}
            paddingH-15
            marginB-20
            secureTextEntry={!registerValidate.showConfirmPass}
            onChangeText={text => {
              setValidate({...registerValidate, confirmPass: text});
            }}
            trailingAccessory={
              <View row center>
                <TouchableOpacity
                  onPress={() =>
                    setValidate({
                      ...registerValidate,
                      showConfirmPass: !registerValidate.showConfirmPass,
                    })
                  }>
                  {registerValidate.showConfirmPass ? (
                    <Image source={AppImages.EYECLOSE} width={23} height={15} />
                  ) : (
                    <Image source={AppImages.EYE} />
                  )}
                </TouchableOpacity>
              </View>
            }
          />

          <CommonButton
            title={'Register'}
            onPress={() => {
              if (Validate()) {
                Register();
              }
            }}
          />

          <View marginT-10 marginB-20>
            <TouchableOpacity
              onPress={() => navigation.replace(RouteNames.LoginScreen)}>
              <Text style={styles.already}>Already have an account? <Text color={AppColors.green}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
