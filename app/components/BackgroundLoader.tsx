import React from 'react';
import {View} from 'react-native-ui-lib';
import {ActivityIndicator, StyleSheet} from 'react-native';
import AppColors from '../constants/AppColors';

interface Props {}

const BackgroundLoader: React.FC<Props> = ({}) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 999,
      }}>
      <View flex center>
        <ActivityIndicator color={AppColors.green} size={'large'} />
      </View>
    </View>
  );
};

export default BackgroundLoader;
