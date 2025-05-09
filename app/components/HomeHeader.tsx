import React from 'react';
import {Image, View} from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import {TouchableOpacity} from 'react-native';

interface Props {
  leftIcon: any;
  onPress?: any;
}

const HomeHeader = ({leftIcon, onPress}: Props) => {
  return (
    <View row>
      <View flex left>
        <TouchableOpacity onPress={onPress}>
          <View padding-20>
            <Image source={leftIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View flex row right >
        {/* <View padding-20>
          <Image source={AppImages.BELL} width={20} height={20}/>
        </View> */}
        <View padding-20>
          {/* <Image source={AppImages.PLACEHOLDER} width={20} height={20} /> */}
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
