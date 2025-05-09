import React, {useEffect, useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CommonButton from '../../components/CommonButton';
import styles from '../login/styles';
import {TouchableOpacity} from 'react-native';

const {TextField} = Incubator;

export type SignUpPageNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SignUpPage'
>;

export type SignUpPageRouteProps = RouteProp<RootStackParams, 'SignUpPage'>;

interface Props {}

const SignUpPage: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<SignUpPageNavigationProps>();
  const [choose, setChoose] = useState('');

  return (
    <View flex backgroundColor="white">
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        color={'black'}
      />

      <View flex padding-20>
        <Text style={styles.title1}>Signup</Text>
        <Text style={styles.text}>Please select your signup type:</Text>

        <TouchableOpacity onPress={() => setChoose('exist')}>
          <View
            style={[
              styles.rect,
              choose == 'exist' && {
                backgroundColor: '#E7EFEB',
                borderColor: '#69A687',
              },
            ]}
            marginT-30
            marginB-20>
            <Text style={styles.SignUpText}>Signup as existing patient</Text>
            <Text style={styles.SignUpDesc}>
              If you have visited our clinic before, please use your
              registration number to signup.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setChoose('new')}>
          <View
            style={[
              styles.rect,
              choose == 'new' && {
                backgroundColor: '#E7EFEB',
                borderColor: '#69A687',
              },
            ]}
            marginB-30>
            <Text style={styles.SignUpText}>Signup as new patient</Text>
            <Text style={styles.SignUpDesc}>
              If you are new to our clinic, please signup as a new patient.
            </Text>
          </View>
        </TouchableOpacity>

        <CommonButton
          title={'Continue'}
          onPress={() => {
            if (choose == 'exist') {
              navigation.navigate(RouteNames.RegisterScreen, {
                isRegistered: true,
              });
            } else if (choose == 'new') {
              navigation.navigate(RouteNames.RegisterScreen, {
                isRegistered: false,
              });
            }
          }}
          disabled={choose == '' ? true : false}
        />
      </View>
    </View>
  );
};
export default SignUpPage;
