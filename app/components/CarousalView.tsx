import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {  Image, Text, View } from 'react-native-ui-lib';
import { Dimensions, FlatList, StyleSheet,} from 'react-native';
import AppImages from '../constants/AppImages';
import AppFonts from '../constants/AppFonts';


const CarouselView = ({}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const carouselWidth = windowWidth ; 
  const carouselHeight = windowHeight * 0.15;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([
        {
          id: 1,
          offer: 'Upto 30% off on Weight Loss Package'
        },
        {
          id: 2,
          offer: 'Get flat 10% discount on your first order'
        },
        {
          id: 3,
          offer: 'Get 1 year gym membership free with One Year Package'
        },
      ]);


    return (
        <View >
        <Carousel
        width={carouselWidth}
        height={carouselHeight}
        autoPlay={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 90,
        }}
        data={images}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
         <View padding-20 centerV style={{backgroundColor:"#76AE91",height:120,width:windowWidth-50,borderRadius:8}}>
          <Text style={styles.text}>{item.offer}</Text>
          <View row centerV marginT-10>
          <Text style={styles.text1}>Book Appointment</Text>
          <Image marginL-10 source={AppImages.NEXT} />
          </View>
            </View>
        )}
    />
      <View row center marginT-5>
                {images.map((item, index) => (
                    <View key={index} style={[styles.dot, { backgroundColor: index === currentIndex ? '#797979' : '#C4C4C4' }]} />
                ))}
            </View>
    
    </View>
    )
}

const styles = StyleSheet.create({
  text:{
    fontSize:18,
    color:'white',
    fontFamily: AppFonts.LATO_BOLD,
    width:'80%'
  },
  text1:{
    fontSize:12,
    color:'white',
    fontFamily: AppFonts.LATO_MEDIUM,
  },
  dot:{
    width:7,
    height:7,
    borderRadius:10,
    marginHorizontal:3
  }
})

export default CarouselView;