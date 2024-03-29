import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles.js';

import skol from '../../../assets/img/skol.png';

import img from '../../services/img';

export default function Component(props){
    const navigation = useNavigation();

    return(
        <View style={{opacity: props.product.qtd > 0 ? 1 : 0.5}}>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product', { product: props.product })}>
                <Image source={{ uri: img + props.product.imgPath }} style={styles.image}/>
                <Text>{props.product.name}</Text>
                <Text style={styles.price}>R${props.product.price.toFixed(2).toString().replace('.', ',')}</Text>
            </TouchableOpacity>
        </View>
    )
}