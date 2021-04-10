import React, {useEffect, useState} from 'react';
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
import api from '../../services/api';
import img from '../../services/img';

export default function ImageSwipe() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    api.get('banners').then(res => {
      setBanners(res.data.banners);
      console.log(res.data.banners);
    });
  }, [])

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsVerticalScrollIndicator={false}
      >
        {
          banners.map(banner => (
            <View key={banner.id + 'banner'}>
              <Image source={{ uri: img + banner.imgPath }} style={styles.image}/>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}