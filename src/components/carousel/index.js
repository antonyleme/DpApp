import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';

import styles from './styles';

import SlideIMG from '../../../assets/img/slides/1.png';

export default function ImageSwipe({img}) {

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image source={SlideIMG} style={styles.image}/>
        </View>
        <View>
          <Image source={SlideIMG} style={styles.image}/>
        </View>
      </ScrollView>
    </View>
  );
}