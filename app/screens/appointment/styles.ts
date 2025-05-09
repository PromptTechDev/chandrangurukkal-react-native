import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
  heading: {
    color: AppColors.green,
    fontSize: 24,
    fontFamily: AppFonts.LATO_MEDIUM,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: AppFonts.LATO_REGULAR,
    color: AppColors.black,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: AppFonts.LATO_BOLD,
    color: AppColors.whitish,
  },
  itemView: {
    height: 100,
    justifyContent: 'flex-end',
    padding: 10,
    marginVertical: 6,
  },
  rectangle: {
    height: 54,
    borderWidth: 1,
    borderColor: AppColors.stroke,
    backgroundColor: AppColors.fill,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: AppFonts.LATO_REGULAR,
    color: AppColors.lightGrey,
  },
  value: {
    fontSize: 16,
    fontFamily: AppFonts.LATO_REGULAR,
    color: AppColors.gray,
  },
  cardView: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    backgroundColor: 'rgba(7,109,57,0.05)',
    borderRadius: 10,
    padding: 14,
    marginVertical: 20,
    marginRight: 20,
  },
  cardView1:{
    borderColor:'#E4E4E4',
    borderWidth:1,
    borderRadius:10,
    marginBottom:10
},
  details: {
    fontSize: 20,
    fontFamily: AppFonts.LATO_BOLD,
    color: AppColors.green,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: AppFonts.LATO_REGULAR,
    color: AppColors.black,
  },
  text1: {
    fontSize: 16,
    fontFamily: AppFonts.LATO_MEDIUM,
    color: AppColors.black,
    marginTop: 5,
  },
  chip: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  handle: {
    height:5,
    width: 50,
    alignSelf: 'center',
    backgroundColor:'#D9D9D9',
    borderRadius:8
  },
  modal: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation:10,
    padding:20
  },
  select: {
    fontSize: 16,
    fontFamily: AppFonts.LATO_MEDIUM,
    color: AppColors.green,
  },
  time: {
    fontSize: 16,
    fontFamily: AppFonts.LATO_MEDIUM,
    color: AppColors.black,
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
  fontSize:14,
  fontFamily: AppFonts.LATO_MEDIUM,
  color:AppColors.white
},
});
