import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: AppColors.white,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical:80
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  footer: {
    // position: 'absolute',
    bottom: 20,
    alignSelf:'center'
  },
  privacyPolicy: {
    textAlign: 'center',
    fontSize: 10,
    color: AppColors.grey,
    fontFamily:AppFonts.LATO_REGULAR
  },
  fieldStyle: {
    borderWidth: 1,
    borderColor: AppColors.stroke,
    backgroundColor: AppColors.fill,
    width: '100%',
    borderRadius: 5,
    height: 40,
    fontFamily:AppFonts.LATO_REGULAR
  },
  buttonlabel: {
    color: AppColors.black,
    fontSize: 16,
    marginLeft:10,
    fontFamily:AppFonts.LATO_MEDIUM
  },
  button: {
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
  or: {
    color: 'black',
    fontSize: 14,
    paddingVertical:30,
    fontFamily:AppFonts.LATO_REGULAR
  },
  title: {
    fontSize: 22,
    color: AppColors.black,
    marginTop:20,
    fontFamily:AppFonts.LATO_BOLD
  },
  text:{
    fontFamily:AppFonts.LATO_REGULAR,
    fontSize:16,
    color:'#3A3A3A'
  },
  title1: {
    fontSize: 24,
    color: AppColors.black,
    marginBottom:20,
    fontFamily:AppFonts.LATO_MEDIUM
  },
  fgtPass:{
    fontFamily:AppFonts.LATO_REGULAR,
    fontSize:14,
    color:AppColors.green,
    marginTop:10,
    
  },
  already: {
    textAlign: 'center',
    fontSize: 14,
    color: AppColors.black,
    fontFamily:AppFonts.LATO_MEDIUM
  },
  rect: {
    borderWidth: 1,
    borderColor: AppColors.stroke,
    backgroundColor: AppColors.fill,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal:20,
    paddingVertical:15,
    fontFamily:AppFonts.LATO_REGULAR
  },
  SignUpText: {
    color: '#3A3A3A',
    fontSize: 16,
    fontFamily:AppFonts.LATO_MEDIUM
  },
  SignUpDesc: {
    color: '#8A8A8A',
    fontSize: 14,
    fontFamily:AppFonts.LATO_REGULAR,
    marginTop:10
  },
});

export default styles;
