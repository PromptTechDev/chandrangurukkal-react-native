import React, {useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const {TextField} = Incubator;

export type ReferNEarnNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ReferNEarn'
>;

export type ReferNEarnRouteProps = RouteProp<RootStackParams, 'ReferNEarn'>;

interface Props {}

const ReferNEarn: React.FC<Props> = () => {
  const navigation = useNavigation<ReferNEarnNavigationProps>();

  return (
    <View flex center>
        <Text>Refer Earn screen</Text>
    </View>
  );
};
export default ReferNEarn;
