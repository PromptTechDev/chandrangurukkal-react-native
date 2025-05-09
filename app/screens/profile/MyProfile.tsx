import React, {useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const {TextField} = Incubator;

export type MyProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyProfile'
>;

export type MyProfileRouteProps = RouteProp<RootStackParams, 'MyProfile'>;

interface Props {}

const MyProfile: React.FC<Props> = () => {
  const navigation = useNavigation<MyProfileNavigationProps>();

  return (
    <View flex center>
        <Text>Profile screen</Text>
    </View>
  );
};
export default MyProfile;
