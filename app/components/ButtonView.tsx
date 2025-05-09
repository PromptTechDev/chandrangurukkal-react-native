import React from "react";
import { Button, Image, Text, View,} from "react-native-ui-lib";
import AppStyles from "../constants/AppStyles";
import { TouchableOpacity } from "react-native";

interface Props {
    onPress: any;
    title: string;
    bottom?: any;
    source: any
}

const ButtonView = ({onPress, title, bottom,source}: Props) => {
    return(
        <TouchableOpacity style={[AppStyles.button1,{marginBottom:bottom}]} onPress={onPress}>
        <Image
          source={source}
        />
        <Text style={AppStyles.buttonlabel1}>{title}</Text>
      </TouchableOpacity>
    )
}

export default ButtonView;