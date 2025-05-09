import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

export const styles = StyleSheet.create({
 title: {
    fontSize:18,
    fontFamily: AppFonts.LATO_MEDIUM,
    color:AppColors.green
 },
 serviceText: {
    fontSize:10,
    fontFamily: AppFonts.LATO_REGULAR,
    color:AppColors.greyBlack,
    marginTop:8
 },
 cardView:{
    borderWidth:1,
    borderColor:'#DFDFDF',
    backgroundColor:'#E7F3ED',
    borderRadius:10,
    padding:14,
    marginVertical:20,
    marginRight:20
 },
 activeView:{
    backgroundColor:'#90D6B2',
    width:60,
    borderRadius:10,
 },
 activeText: {
    fontSize:14,
    fontFamily: AppFonts.LATO_REGULAR,
    color:AppColors.black
 },

 cardText: {
    fontSize:20,
    fontFamily: AppFonts.LATO_BOLD,
    color:AppColors.green
 },
 expireText: {
    fontSize:10,
    fontFamily: AppFonts.LATO_REGULAR,
    color:AppColors.black,
    paddingBottom:5
 },
 dateText: {
    fontSize:12,
    fontFamily: AppFonts.LATO_MEDIUM,
    color:AppColors.black
 },
 nameText: {
    fontSize:24,
    fontFamily: AppFonts.LATO_MEDIUM,
    color:AppColors.black,
    marginBottom:20
 },
 packageText: {
    fontSize:22,
    fontFamily: AppFonts.LATO_BOLD,
    color:AppColors.white,
    width:'70%'
 },
 smallView:{
    width:110,
    height:30,
    backgroundColor:'rgba(87, 87, 87, 0.32)',
    borderWidth:1,
    borderColor:'#BABABA',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
 },
 priceText: {
    fontSize:14,
    fontFamily: AppFonts.LATO_MEDIUM,
    color:AppColors.white
 },
})