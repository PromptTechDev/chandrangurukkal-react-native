import React, {useState} from 'react';
import {Button, Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const {TextField} = Incubator;

export type PrescriptionDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PrescriptionDetails'
>;

export type PrescriptionDetailsRouteProps = RouteProp<RootStackParams, 'PrescriptionDetails'>;

interface Props {}

const PrescriptionDetails: React.FC<Props> = () => {
  const navigation = useNavigation<PrescriptionDetailsNavigationProps>();

  return (
    <View flex center>
        <Text>Prescription Details screen</Text>
    </View>
  );
};
export default PrescriptionDetails;
