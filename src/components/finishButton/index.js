import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles.js';
import { useSelector } from 'react-redux';

export default function Component(props){
    const navigation = useNavigation();

    const user = useSelector(state => state.auth.user);

    function checkout(){
        if(user) return navigation.navigate('Checkout');

        navigation.navigate('Auth');
    }

    return(
        props.total > 0 &&
        <TouchableOpacity style={styles.button} onPress={checkout}>
        <Text style={styles.text}>Finalizar pedido</Text>
            <Text style={styles.text}>R${props.total.toString().replace('.', ',')}</Text>
        </TouchableOpacity>
    )
}