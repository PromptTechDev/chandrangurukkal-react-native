import {StyleSheet} from 'react-native';
import AppColors from './AppColors';
import AppFonts from './AppFonts';


const AppStyles = StyleSheet.create({
    buttonlabel:{
color:AppColors.whitish,
fontSize:16,
fontFamily:AppFonts.LATO_MEDIUM
    },
    button:{
        backgroundColor:AppColors.primary,
        width:'100%',
        borderRadius:5,
    },
    buttonlabel1: {
        color: AppColors.black,
        fontSize: 16,
        marginLeft:10,
        fontFamily:AppFonts.LATO_MEDIUM
      },
      button1: {
        backgroundColor: 'F7F7F7',
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: AppColors.stroke,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flexDirection: 'row',
      },
      drawerText:{
        fontSize:14,
        fontFamily:AppFonts.LATO_REGULAR,
        color:AppColors.greyBlack,
      }
});

export default AppStyles;