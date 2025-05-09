import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Platform } from "react-native";
import { Card, Incubator } from "react-native-ui-lib";
import AppColors from "../../constants/AppColors";
import CommonButton from "../../components/CommonButton";
import AppFonts from "../../constants/AppFonts";

const {TextField} = Incubator;

interface Props {
  modalVisible: any;
  setModalVisible: any;
}

const CallBackScreen = ({modalVisible, setModalVisible}:Props) => {

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
      <View style={styles.alertBox}>
          <View style={styles.modaltype}>
            <Card elevation={8} style={styles.androidAlertBox}>
              <Text style={styles.title}>Request a Callback</Text>
              <TextField
              label={'Phone Number'}
              labelStyle={styles.label}
              placeholder={'Enter phone number'}
              placeholderTextColor={'grey'}
              keyboardType={'phone-pad'}
              fieldStyle={styles.fieldStyle}
              marginB-10
              marginT-20
              padding-10
              color={'black'}/>

              <TextField
              label={'Remarks'}
              labelStyle={styles.label}
              placeholder={'Write your issue here.............'}
              placeholderTextColor={'grey'}
              fieldStyle={[styles.fieldStyle,{height:100}]}
              multiline
              marginB-20
              padding-10
              textAlignVertical="top" 
              color={'black'}/>
              <CommonButton title="Send Request" onPress={()=>{setModalVisible(false)}}/>
            </Card>
          </View>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
modaltype:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.55)',
    justifyContent:'center',
    width:'100%'
},
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAlertBox: {
    marginHorizontal: 20,
    borderRadius:15,
    backgroundColor:AppColors.whitish,
    padding:20
  },
  fieldStyle:{
    borderWidth:1,
    borderColor:AppColors.stroke,
    backgroundColor:AppColors.fill,
    borderRadius:5,
    height:40,
  },
  title: {
    fontSize: 18,
    fontFamily: AppFonts.LATO_MEDIUM,
    color: AppColors.green,
  },
  label: {
    fontSize: 14,
    fontFamily: AppFonts.LATO_REGULAR,
    color: AppColors.black,
  },
});
export default CallBackScreen;