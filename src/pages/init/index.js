import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';

import Button from '../../components/button';
import globalStyles from '../../styles';
import styles from './styles';
import DeliveryPNG from '../../../assets/img/delivery.png';

export default function Page(){
    const navigation = useNavigation();

    useEffect(() => {
    }, []);

    function init(){
        navigation.navigate('Home');
    }

    return(
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <Image source={DeliveryPNG} style={styles.image}/>
            
            <View style={styles.header}>
                <Text style={styles.h1}>O mais rápido</Text>
                <Text style={styles.h1}>Delivery de bebidas</Text>
            </View>

            <Text style={styles.p}>Faça seu pedido no delivery de bebidas mais rápido e famoso da cidade.</Text>

            <View style={styles.button}>
                <Button onPress={init}>Iniciar</Button>
            </View>
        </SafeAreaView>
    )
}