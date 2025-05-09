import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

export const styles = StyleSheet.create({
    heading:{
        color:AppColors.green,
        fontSize:24,
        fontFamily:AppFonts.LATO_MEDIUM,
        marginBottom:20
    },
    cardView:{
        borderColor:'#E4E4E4',
        borderWidth:1,
        borderRadius:10,
        marginBottom:10
    },
    smallView:{
        height:30,
        backgroundColor:'rgba(87, 87, 87, 0.32)',
        borderWidth:1,
        borderColor:'#BABABA',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10
     },
     statusText: {
        fontSize:13,
        fontFamily: AppFonts.LATO_MEDIUM,
        color:AppColors.white
     },
     chip:{
        position: 'absolute',
        left: 15,
        right: 0,
        top: 15,
        width: 90
     },
     image:{
        width: '100%', height: 130,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
     },
     line:{
        borderLeftColor:AppColors.black, borderLeftWidth:1,
        marginHorizontal:6,
        height:14
     },
     title:{
        color:AppColors.green,
        fontSize:16,
        fontFamily:AppFonts.LATO_MEDIUM,
    },
    number:{
        color:AppColors.green,
        fontSize:16,
        fontFamily:AppFonts.LATO_BOLD,
        marginTop:15,
        marginBottom:10
    },
    text:{
        color:AppColors.black,
        fontSize:12,
        fontFamily:AppFonts.LATO_MEDIUM,
    },
    detailsView:{
        borderWidth:1,
        borderColor:'#E4E4E4',
        backgroundColor:'#EDF2F0',
        marginBottom:10,
        borderRadius:5,
        padding:20
    },
    subHeading:{
        color:AppColors.green,
        fontSize:18,
        fontFamily:AppFonts.LATO_MEDIUM,
        marginBottom:10
    },
    innerView:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#E4E4E4',
        marginVertical:10,
        paddingHorizontal:10,
        borderRadius:5,
        flex:1
    },
    subText:{
        color:AppColors.greyBlack,
        fontSize:16,
        fontFamily:AppFonts.LATO_MEDIUM,
    },
    subText1:{
        color:'#818181',
        fontSize:12,
        fontFamily:AppFonts.LATO_REGULAR,
        marginTop:10
    },
    priceText: {
        fontSize:14,
        fontFamily: AppFonts.LATO_MEDIUM,
        color:AppColors.white
     },
     separator:{
        borderBottomWidth:1,
        borderBottomColor:'#E4E4E4',
        flex:1
     },
     dot:{
        borderWidth:3,
        borderColor:'#E4E4E4',
        flex:0.001,
     }
})