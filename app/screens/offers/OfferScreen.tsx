import React, {useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const {TextField} = Incubator;

export type OfferScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'OfferScreen'
>;

export type OfferScreenRouteProps = RouteProp<RootStackParams, 'OfferScreen'>;

interface Props {}

const OfferScreen: React.FC<Props> = () => {
  const navigation = useNavigation<OfferScreenNavigationProps>();

  return (
    <View flex center>
        <Text>Profile screen</Text>
    </View>
  );
};
export default OfferScreen;
