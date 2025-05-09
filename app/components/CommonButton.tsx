import React from "react";
import { ActivityIndicator,} from "react-native";
import { Button,} from "react-native-ui-lib";
import AppStyles from "../constants/AppStyles";

interface Props {
    onPress: any;
    title: string;
    disabled?: any
}

const CommonButton = ({onPress, title, disabled}: Props) => {
    return(
        <Button
        label={title}
        labelStyle={AppStyles.buttonlabel}
        style={[AppStyles.button,disabled&&{backgroundColor:'#868686'}]}
        onPress={onPress}
        disabled={disabled}
      />
    )
}

export default CommonButton;